import { BaseEntityService } from '@erp2/model';
import { SalesInvoiceModel } from './sales.invoice.model';
import { SalesInvoiceSaveArgsModel } from './sales.invoice.save.args.model';
import { SalesInvoice } from './sales.invoice';
import { Repository } from 'typeorm/index';

export const SalesInvoiceServiceKey = 'SalesInvoiceService';

export class SalesInvoiceService extends BaseEntityService<
  SalesInvoiceModel,
  SalesInvoiceSaveArgsModel
> {
  createEntity(): SalesInvoiceModel {
    return new SalesInvoice();
  }

  protected getRepository(transactionalEntityManager): Repository<SalesInvoiceModel>{
    return transactionalEntityManager.getRepository(SalesInvoice);
  }
  protected async doSave(
    args: SalesInvoiceSaveArgsModel,
    invoice: SalesInvoiceModel
  ): Promise<SalesInvoiceModel> {
    const {
      bankAccountService,
      customerService,
      organizationService,
      currencyService,
      salesInvoiceLineService,
      taxService,
      reportsServiceModel,
      languagesService
    } = this.getInjector();
    invoice.customer = Promise.resolve(
      args.customer
        ? args.customer
        : await customerService.getCustomer(args.customerDisplayName)
    );
    const organization = args.organization
      ? args.organization
      : await organizationService.getOrg(args.organizationDisplayName);
    invoice.organization = Promise.resolve(organization);
    invoice.bankAccount = organization.bankAccount;
    invoice.issuedOn = onlyDate(args.issuedOn);
    invoice.dueDate = onlyDate(
      new Date(+invoice.issuedOn + args.paymentTermInDays * 86400000)
    );
    invoice.grandTotal = 0;
    invoice.grandTotalAccountingSchemeCurrency = 0;
    invoice.totalLines = 0;
    invoice.totalLinesAccountingSchemeCurrency = 0;
    invoice.transactionDate = args.transactionDate;
    invoice.paymentTermInDays = args.paymentTermInDays;
    invoice.currency = Promise.resolve(
      args.currency
        ? args.currency
        : await currencyService.getCurrency(args.currencyIsoCode)
    );
    invoice.currencyMultiplyingRateToAccountingSchemeCurrency = 0;
    invoice.narration = 'invalid';
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
    const languages = languagesService.getLanguages();
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

    await this.persist(invoice);

    const vatRegistrations = await organization.vatRegistrations;
    const vatRegistered = vatRegistrations && vatRegistrations.length > 0;

    let lineOrder = 10;
    const invoiceLines = [];
    for (const line1 of args.lines) {
      const line = await salesInvoiceLineService.save({
        ...line1,
        product: await line1.product,
        lineTax:
          vatRegistered && !invoice.reverseCharge
            ? await line1.lineTax
            : await taxService.getZeroTax(),
        invoice,
        lineOrder
      });
      lineOrder += 10;
      invoiceLines.push(line);
    }
    invoice.lines = Promise.resolve(invoiceLines);

    const result = await this.calculatePrices(invoice);

    await reportsServiceModel.printSalesInvoice(result, result.printLanguage);

    return result;
  }

  typeName(): string {
    return SalesInvoiceServiceKey;
  }

  async calculatePrices(
    invoiceWithLines: SalesInvoiceModel
  ): Promise<SalesInvoiceModel> {
    const { currencyRateService, salesInvoiceVatService } = this.getInjector();
    if (!invoiceWithLines) return invoiceWithLines;

    const currencyRate = await currencyRateService.getAccountingForDateAndOrg(
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
    const vatRegistrations = await org.vatRegistrations;
    const vatRegistered = vatRegistrations && vatRegistrations.length > 0;
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
    const taxes = await groupBy(lineCalculatedTaxes, x => x.vatRatePercent);
    const vatReport: SalesInvoiceVatModel[] = [];

    // remove the old invoiceWithLines.vatReport
    const oldVatReports = await invoiceWithLines.vatReport;
    if (oldVatReports) {
      for (const oldVatReport of oldVatReports) {
        await salesInvoiceVatService.delete(oldVatReport);
      }
    }

    for (const [vatRatePercent, toBeSummed] of taxes) {
      const vatTotal = sum(toBeSummed.map(x => x.vatTotal));
      const vatTotalAccountingSchemeCurrency = sum(
        toBeSummed.map(x => x.vatTotalAccountingSchemeCurrency)
      );
      vatReport.push(
        await salesInvoiceVatService.save({
          vatRatePercent: vatRatePercent as number,
          vatTotalRaw: vatTotal,
          vatTotal: roundNumber(vatTotal, 2),
          vatTotalAccountingSchemeCurrencyRaw: vatTotalAccountingSchemeCurrency,
          vatTotalAccountingSchemeCurrency: roundNumber(
            vatTotalAccountingSchemeCurrency,
            2
          ),
          invoice: invoiceWithLines
        })
      );
    }

    invoiceWithLines.vatReport = Promise.resolve(vatReport);
    invoiceWithLines.totalLinesAccountingSchemeCurrency = roundNumber(
      invoiceWithLines.totalLines *
        currencyMultiplyingRateToAccountingSchemeCurrency,
      2
    );
    invoiceWithLines.totalLines = roundNumber(invoiceWithLines.totalLines, 2);
    invoiceWithLines.grandTotalAccountingSchemeCurrency = roundNumber(
      invoiceWithLines.grandTotal *
        currencyMultiplyingRateToAccountingSchemeCurrency,
      2
    );
    invoiceWithLines.grandTotal = roundNumber(invoiceWithLines.grandTotal, 2);

    invoiceWithLines.currencyMultiplyingRateToAccountingSchemeCurrency = currencyMultiplyingRateToAccountingSchemeCurrency;
    invoiceWithLines.narration =
      `${
        ((await invoiceWithLines.organization) || { displayName: 'noorg' })
          .displayName
      } -> ` +
      `${((await invoiceWithLines.customer) || { displayName: 'nocust' })
        .displayName || ''}:` +
      `${dateToISO(invoiceWithLines.issuedOn)}:${
        invoiceWithLines.grandTotal
      }:${dateToISO(invoiceWithLines.dueDate)}`;
    invoiceWithLines.isCalculated = true;

    return invoiceWithLines;
  }

  async confirm(invoice: SalesInvoiceModel): Promise<SalesInvoiceModel> {
    const { reportsServiceModel } = this.getInjector();
    const salesInvoiceJob = new SalesInvoiceJob();
    invoice.isDraft = false;
    await salesInvoiceJob.assignDocumentNumbers(
      [invoice],
      this.getInjector().documentNumberingServiceModel
    );
    await reportsServiceModel.printSalesInvoice(invoice, invoice.printLanguage);
    await this.persist(invoice);
    return invoice;
  }
}
