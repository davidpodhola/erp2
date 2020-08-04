import { BaseEntityService, OrganizationService, OrganizationServiceKey, SalesInvoice } from '@erp2/model';
import { SalesInvoiceModel } from './sales.invoice.model';
import { SalesInvoiceSaveArgsModel } from './sales.invoice.save.args.model';
import { EntityManager, Repository } from 'typeorm/index';
import { BankAccountService, BankAccountServiceKey } from './bank.account.service';
import { CustomerService, CustomerServiceKey } from './customer.service';
import { Inject } from '@nestjs/common';
import { CurrencyService, CurrencyServiceKey } from './currency.service';
import { SalesInvoiceLineService, SalesInvoiceLineServiceKey } from './sales.invoice.line.service';
import { TaxService, TaxServiceKey } from './tax.service';
import { ReportsService, ReportsServiceKey } from './reports.service';
import { LanguagesService } from './languages.service';
import { CurrencyRateService, CurrencyRateServiceKey } from './currency.rate.service';
import * as _ from "lodash";
import { SalesInvoiceVatModel } from './sales.invoice.vat.model';
import { SalesInvoiceVatService, SalesInvoiceVatServiceKey } from './sales.invoice.vat.service';
import { DocumentNumberingService, DocumentNumberingServiceKey } from './document.numbering.service';
import moment = require('moment');

export const SalesInvoiceServiceKey = 'SalesInvoiceService';

export class SalesInvoiceService extends BaseEntityService<
  SalesInvoiceModel,
  SalesInvoiceSaveArgsModel
> {
  constructor(
    @Inject(BankAccountServiceKey) protected readonly bankAccountService : BankAccountService,
    @Inject(CustomerServiceKey) protected readonly customerService : CustomerService,
    @Inject(OrganizationServiceKey) protected readonly organizationService : OrganizationService,
    @Inject(CurrencyServiceKey) protected readonly currencyService : CurrencyService,
    @Inject(SalesInvoiceLineServiceKey) protected readonly salesInvoiceLineService : SalesInvoiceLineService,
    @Inject(TaxServiceKey) protected readonly taxService : TaxService,
    @Inject(ReportsServiceKey) protected readonly reportsServiceModel : ReportsService,
    @Inject(OrganizationServiceKey) protected readonly languagesService : LanguagesService,
    @Inject(CurrencyRateServiceKey) protected readonly currencyRateService: CurrencyRateService,
    @Inject(SalesInvoiceVatServiceKey) protected readonly salesInvoiceVatService: SalesInvoiceVatService,
    @Inject(ReportsServiceKey) protected readonly reportsService : ReportsService,
    @Inject(DocumentNumberingServiceKey) protected readonly documentNumberingServiceModel: DocumentNumberingService
  ) {
    super();
  }

  createEntity(): SalesInvoiceModel {
    return new SalesInvoice();
  }

  protected getRepository(transactionalEntityManager): Repository<SalesInvoiceModel>{
    return transactionalEntityManager.getRepository(SalesInvoice);
  }
  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: SalesInvoiceSaveArgsModel,
    invoice: SalesInvoiceModel
  ): Promise<SalesInvoiceModel> {
    invoice.customer =
      args.customer
        ? args.customer
        : await this.customerService.getCustomer(transactionalEntityManager, args.customerDisplayName)
    ;
    const organization = args.organization
      ? args.organization
      : await this.organizationService.getOrg(transactionalEntityManager, args.organizationDisplayName);
    invoice.organization = organization;
    invoice.bankAccount = organization.bankAccount;
    invoice.issuedOn = moment(args.issuedOn).startOf('day').toDate();
    invoice.dueDate = moment(
      new Date(+invoice.issuedOn + args.paymentTermInDays * 86400000)
    ).startOf('day').toDate();
    invoice.grandTotal = 0;
    invoice.grandTotalAccountingSchemeCurrency = 0;
    invoice.totalLines = 0;
    invoice.totalLinesAccountingSchemeCurrency = 0;
    invoice.transactionDate = args.transactionDate;
    invoice.paymentTermInDays = args.paymentTermInDays;
    invoice.currency =
      args.currency
        ? args.currency
        : await this.currencyService.getCurrency(transactionalEntityManager,args.currencyIsoCode)
    ;
    invoice.currencyMultiplyingRateToAccountingSchemeCurrency = 0;
    invoice.isDraft = true;
    invoice.isCalculated = false;
    // TODO: implement also other reverse charge conditions
    // see e.g. https://europa.eu/youreurope/business/taxation/vat/cross-border-vat/index_en.htm
    // or https://www.uctovani.net/clanek.php?t=Preneseni-danove-povinnosti-neboli-reverse-charge&idc=217
    const customerCountry = await (await (await invoice.customer).legalAddress)
      .country;
    const supplierCountry = await (await organization.legalAddress).country;
    invoice.reverseCharge =
      customerCountry.isEUMember &&
      supplierCountry.isEUMember &&
      customerCountry.isoCode !== supplierCountry.isoCode;

    // TODO: get better printLanguage implementation
    const languages = this.languagesService.getLanguages();
    const language =
      customerCountry.isoCode === supplierCountry.isoCode
        ? languages.find(
            x =>
              x.isoCode.toLowerCase() === customerCountry.isoCode.toLowerCase()
          )
        : languages.find(
            x =>
              x.isoCode.toLowerCase() ===
              `${supplierCountry.isoCode}-${customerCountry.isoCode}`.toLowerCase()
          );
    if (!language)
      throw new Error(
        `No language for ${supplierCountry.isoCode} -> ${customerCountry.isoCode}`
      );
    invoice.printLanguage = language;

    await this.persist(transactionalEntityManager, invoice);

    const vatRegistered = !!organization.vatNumber;

    let lineOrder = 10;
    const invoiceLines = [];
    for (const line1 of args.lines) {
      const line = await this.salesInvoiceLineService.save(transactionalEntityManager, {
        ...line1,
        product: await line1.product,
        lineTax:
          vatRegistered && !invoice.reverseCharge
            ? await line1.lineTax
            : await this.taxService.getZeroTax(transactionalEntityManager),
        invoice,
        lineOrder
      });
      lineOrder += 10;
      invoiceLines.push(line);
    }
    invoice.lines = invoiceLines;

    const result = await this.calculatePrices(transactionalEntityManager, invoice);

    await this.reportsServiceModel.printSalesInvoice(result, result.printLanguage);

    return result;
  }

  typeName(): string {
    return SalesInvoiceServiceKey;
  }

  async calculatePrices(
    transactionalEntityManager: EntityManager,
    invoiceWithLines: SalesInvoiceModel
  ): Promise<SalesInvoiceModel> {
    if (!invoiceWithLines) return invoiceWithLines;

    const currencyRate = await this.currencyRateService.getAccountingForDateAndOrg(
      invoiceWithLines.transactionDate,
      await invoiceWithLines.currency,
      await invoiceWithLines.organization
    );
    if (!currencyRate)
      throw new Error(
        `No currency rate for ${
          (await invoiceWithLines.currency).displayName
        } at ${invoiceWithLines.transactionDate}`
      );
    const currencyMultiplyingRateToAccountingSchemeCurrency: number =
      currencyRate.currencyMultiplyingRate;
    const lines = await invoiceWithLines.lines;

    invoiceWithLines.totalLines = 0;
    invoiceWithLines.grandTotal = 0;
    const org = await invoiceWithLines.organization;
    const vatRegistered = !!org.vatNumber;
    const lineCalculatedTaxes = [];
    if (lines) {
      for (const line of lines) {
        // make sure we work with number, so do not use +=
        invoiceWithLines.totalLines =
          +invoiceWithLines.totalLines + line.linePrice;
        const lineTax = await line.lineTax;
        const vatTotal = vatRegistered
          ? +line.linePrice * (+lineTax.ratePercent / 100)
          : 0;

        const lineCalculatedTax = {
          vatRatePercent: vatRegistered ? lineTax.ratePercent : 0,
          vatTotal,
          vatTotalAccountingSchemeCurrency:
            vatTotal * currencyMultiplyingRateToAccountingSchemeCurrency
        };
        lineCalculatedTaxes.push(lineCalculatedTax);
        // make sure we work with number, so do not use +=
        invoiceWithLines.grandTotal =
          +invoiceWithLines.grandTotal +
          line.linePrice +
          lineCalculatedTax.vatTotal;
      }
    }
    const taxes = _.groupBy(lineCalculatedTaxes, x => x.vatRatePercent);
    const vatReport: SalesInvoiceVatModel[] = [];

    // remove the old invoiceWithLines.vatReport
    const oldVatReports = invoiceWithLines.vatReport;
    if (oldVatReports) {
      for (const oldVatReport of oldVatReports) {
        await this.salesInvoiceVatService.delete(transactionalEntityManager, oldVatReport);
      }
    }

    for (const [vatRatePercent, toBeSummed] of Object.entries(taxes)) {
      const vatTotal = _.sum(toBeSummed.map(x => x.vatTotal));
      const vatTotalAccountingSchemeCurrency = _.sum(
        toBeSummed.map(x => x.vatTotalAccountingSchemeCurrency)
      );
      vatReport.push(
        await this.salesInvoiceVatService.save(transactionalEntityManager,{
          vatRatePercent: +vatRatePercent,
          vatTotalRaw: vatTotal,
          vatTotal: _.round(vatTotal, 2),
          vatTotalAccountingSchemeCurrencyRaw: vatTotalAccountingSchemeCurrency,
          vatTotalAccountingSchemeCurrency: _.round(
            vatTotalAccountingSchemeCurrency,
            2
          ),
          invoice: invoiceWithLines
        })
      );
    }

    invoiceWithLines.vatReport = vatReport;
    invoiceWithLines.totalLinesAccountingSchemeCurrency = _.round(
      invoiceWithLines.totalLines *
        currencyMultiplyingRateToAccountingSchemeCurrency,
      2
    );
    invoiceWithLines.totalLines = _.round(invoiceWithLines.totalLines, 2);
    invoiceWithLines.grandTotalAccountingSchemeCurrency = _.round(
      invoiceWithLines.grandTotal *
        currencyMultiplyingRateToAccountingSchemeCurrency,
      2
    );
    invoiceWithLines.grandTotal = _.round(invoiceWithLines.grandTotal, 2);

    invoiceWithLines.currencyMultiplyingRateToAccountingSchemeCurrency = currencyMultiplyingRateToAccountingSchemeCurrency;
    invoiceWithLines.isCalculated = true;

    return invoiceWithLines;
  }

  async confirm(manager: EntityManager, invoice: SalesInvoiceModel): Promise<SalesInvoiceModel> {
    invoice.isDraft = false;
    await this.assignDocumentNumbersToInvoices(
      manager,
      [invoice],
    );
    await this.reportsServiceModel.printSalesInvoice(invoice, invoice.printLanguage);
    await this.persist(manager, invoice);
    return invoice;
  }

  async fixPrint(manager: EntityManager) {
    const invoices = await manager
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .select('invoice')
      .from(SalesInvoice, 'invoice')
      .where(`invoice.content is NULL`, {})
      .orderBy('id')
      .getMany();

    for (const invoice of invoices) {
      const printed = await this.reportsService.printSalesInvoice(
        invoice,
        invoice.printLanguage
      );
      await manager.save(printed);
    }
  }

  async assignDocumentNumbersToInvoices(
    manager: EntityManager,
    notDraftInvoicesWithoutDocumentNumber: Array<SalesInvoiceModel>,
  ) {
    for (const invoice of notDraftInvoicesWithoutDocumentNumber) {
      if (invoice.documentNo || invoice.isDraft) {
        throw new Error(
          'Call with non draft invoices without document number only!'
        );
      }
      invoice.documentNo = await this.documentNumberingServiceModel.getNextDocumentNumber(
        manager,
        invoice.constructor,
        await invoice.organization
      );
    }
  }
}
