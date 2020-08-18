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
  DocumentNumberSequence,
  getService,
  OrganizationService,
  OrganizationServiceKey,
  ProductService,
  ProductServiceKey,
  SalesInvoice,
  SalesInvoiceLineSaveArgsModel,
  SalesInvoiceService,
  SalesInvoiceServiceKey,
  TaxService,
  TaxServiceKey,
} from '@erp2/model';
import * as moment from 'moment';

export class CreateInvoice202007C1597723044723 implements MigrationInterface {
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

    const expertWorks = await productService.save(entityManager, {
      displayName: 'O365 Business Prem',
      sku: 'MS.O365.BP.M',
    });

    const customer = await customerService.save(entityManager, {
      legalAddress: {
        country: czechia,
        city: 'Praha',
        line1: 'Svornosti 985/8',
        zipCode: '15000',
      },
      displayName: 'RealityzaPrahou',
      legalName: 'RealityzaPrahou s.r.o.',
      vatNumber: 'CZ27125319',
      invoicingEmail: 'dumrealit_progres@dumrealit.cz',
      idNumber: '27125319',
    });

    const issuedOn = new Date(2020, 7 - 1, 31);
    const start = moment(issuedOn).startOf('day').toDate();
    const end = moment(issuedOn).endOf('day').toDate();
    await currencyRateService.save(entityManager, {
      start,
      end,
      currencyMultiplyingRate: 26.175,
      fromIsoCode: 'EUR',
      toIsoCode: 'CZK',
    });
    const lines: SalesInvoiceLineSaveArgsModel[] = [
      {
        lineTaxIsStandard: true,
        product: expertWorks,
        linePrice: 4 * 12.7,
        quantity: 4,
        narration:
          'Licence Office 365 Business Premium na období 23.8.2020 do 22.9.2021',
        lineOrder: 1,
      },
    ];
    const invoice = await salesInvoiceService.save(entityManager, {
      customer,
      organization,
      paymentTermInDays: 23,
      transactionDate: issuedOn,
      issuedOn,
      currency: eur,
      lines,
    });
    await salesInvoiceService.confirm(entityManager, invoice);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
