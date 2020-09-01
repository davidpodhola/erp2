import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  AccountingSchemeService,
  AccountingSchemeServiceKey,
  BankAccountService,
  BankAccountServiceKey,
  BankService,
  BankServiceKey,
  CountryService,
  CountryServiceKey,
  CurrencyRateService,
  CurrencyRateServiceKey,
  CurrencyService,
  CurrencyServiceKey,
  CustomerService,
  CustomerServiceKey,
  getService,
  OrganizationService,
  OrganizationServiceKey,
  ProductService,
  ProductServiceKey,
  SalesInvoiceLineSaveArgsModel,
  SalesInvoiceService,
  SalesInvoiceServiceKey,
  TaxService,
  TaxServiceKey,
} from '@erp2/model';
import * as moment from 'moment';
import * as _ from 'lodash';

export class Invoices2020081598520059145 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const entityManager = queryRunner.manager;
    const organizationService: OrganizationService = getService(
      OrganizationServiceKey
    );
    const currencyService: CurrencyService = getService(CurrencyServiceKey);
    const bankService: BankService = getService(BankServiceKey);
    const bankAccountService: BankAccountService = getService(
      BankAccountServiceKey
    );
    const accountingSchemeService: AccountingSchemeService = getService(
      AccountingSchemeServiceKey
    );
    const countryService: CountryService = getService(CountryServiceKey);

    const productService: ProductService = getService(ProductServiceKey);

    const customerService: CustomerService = getService(CustomerServiceKey);

    const salesInvoiceService: SalesInvoiceService = getService(
      SalesInvoiceServiceKey
    );

    const taxService: TaxService = getService(TaxServiceKey);

    const currencyRateService: CurrencyRateService = getService(
      CurrencyRateServiceKey
    );

    const czechia = await countryService.getCountry(entityManager, 'CZ');

    const czk = await currencyService.getCurrency(entityManager, 'CZK');

    const eur = await currencyService.getCurrency(entityManager, 'EUR');

    const organization = await organizationService.getOrg(
      entityManager,
      'NUCZ'
    );

    const o365businessBasic = await productService.save(entityManager, {
      displayName: 'MS 365 Bus. Bas.',
      sku: 'MS.O365.BE.A',
    });
    const o365businessStandard = await productService.save(entityManager, {
      displayName: 'MS 365 Bus. Std.',
      sku: 'MS.O365.BP.A',
    });

    const customer = await customerService.save(entityManager, {
      legalAddress: {
        country: czechia,
        city: 'Praha 10',
        line1: 'Nad horizontem 258/13',
        zipCode: '10200',
      },
      displayName: 'stylishrooms',
      legalName: 'Stylishrooms s.r.o.',
      vatNumber: 'CZ24157091',
      invoicingEmail: 'tomas.vesely@stylishrooms.cz',
      idNumber: '24157091',
    });

    const issuedOn = new Date(2020, 8 - 1, 26);
    const start = moment(issuedOn).startOf('day').toDate();
    const end = moment(issuedOn).endOf('day').toDate();
    await currencyRateService.save(entityManager, {
      start,
      end,
      currencyMultiplyingRate: 26.26,
      fromIsoCode: 'EUR',
      toIsoCode: 'CZK',
    });
    const lines: SalesInvoiceLineSaveArgsModel[] = [
      {
        lineTaxIsStandard: true,
        product: o365businessBasic,
        linePrice: _.round((7 * 50.4 - 8.4) * 26.26, 2),
        quantity: 7,
        narration:
          'Licence Microsoft 365 Business Basic na období 21.8.2020-20.8.2021',
        lineOrder: 1,
      },
      {
        lineTaxIsStandard: true,
        product: o365businessStandard,
        linePrice: _.round(2 * 126 * 26.26, 2),
        quantity: 2,
        narration:
          'Licence Microsoft 365 Business Standard na období 21.8.2020-20.8.2021',
        lineOrder: 1,
      },
    ];
    const invoice = await salesInvoiceService.save(entityManager, {
      customer,
      organization,
      paymentTermInDays: 14,
      transactionDate: issuedOn,
      issuedOn,
      currency: czk,
      lines,
    });
    await salesInvoiceService.confirm(entityManager, invoice);
  }

  public async down(): Promise<void> {
    /* intentionally left blank */
  }
}
