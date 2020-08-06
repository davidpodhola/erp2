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
  CurrencyService,
  CurrencyServiceKey,
  CustomerService,
  CustomerServiceKey,
  DocumentNumberSequence,
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
import { BaseMigration } from '../migration.service';

export class CreateInvoice202007B1596628283384 extends BaseMigration
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const entityManager = queryRunner.manager;
    const organizationService: OrganizationService = this.moduleRef.get(
      OrganizationServiceKey
    );
    const currencyService: CurrencyService = this.moduleRef.get(
      CurrencyServiceKey
    );
    const bankService: BankService = this.moduleRef.get(BankServiceKey);
    const bankAccountService: BankAccountService = this.moduleRef.get(
      BankAccountServiceKey
    );
    const accountingSchemeService: AccountingSchemeService = this.moduleRef.get(
      AccountingSchemeServiceKey
    );
    const countryService: CountryService = this.moduleRef.get(
      CountryServiceKey
    );

    const productService: ProductService = this.moduleRef.get(
      ProductServiceKey
    );

    const customerService: CustomerService = this.moduleRef.get(
      CustomerServiceKey
    );

    const salesInvoiceService: SalesInvoiceService = this.moduleRef.get(
      SalesInvoiceServiceKey
    );

    const taxService: TaxService = this.moduleRef.get(TaxServiceKey);

    const bankAccount = await bankAccountService.save(entityManager, {
      bankDisplayName: 'FIO',
      displayName: 'FIO-FO',
      bankAccountCustomerPrintableNumber: '2301288334/2010',
      iban: 'CZ7520100000002301288334',
      swift: 'FIOBCZPPXXX',
    });

    const accountingScheme = await accountingSchemeService.getAccountingScheme(
      entityManager,
      'main czk'
    );
    const organization = await organizationService.save(entityManager, {
      displayName: 'DP',
      legalName: 'David Podhola',
      legalAddress: {
        city: 'Chlístovice',
        line1: 'Chlístovice 130',
        zipCode: '28401',
        countryIsoCode: 'CZ',
      },
      bankAccount,
      accountingScheme,
      registration: 'Fyzická osoba zapsaná v živnostenském rejstříku.',
      contact: 'david@podhola.net',
      idNumber: '87408961',
      vatNumber: 'CZ7512222586',
    });

    const documentNumberSequence = new DocumentNumberSequence();
    documentNumberSequence.current = 20202005;
    documentNumberSequence.forType = SalesInvoice.name;
    documentNumberSequence.organization = organization;
    await entityManager.save(documentNumberSequence);

    const customer = await customerService.getCustomer(entityManager, 'evalue');

    const issuedOn = new Date(2020, 7 - 1, 31);
    const lines: SalesInvoiceLineSaveArgsModel[] = [
      {
        lineTaxIsStandard: true,
        productSku: 'EX',
        linePrice: 0.6*191.75*7000/8,
        quantity: 0.6*191.75,
        narration: 'Vývoj projektu TEAS (Carvago) v červenci 2020',
        lineOrder: 1,
      },
    ];
    const invoice = await salesInvoiceService.save(entityManager, {
      customer,
      organization,
      paymentTermInDays: 14,
      transactionDate: issuedOn,
      issuedOn,
      currencyIsoCode: 'CZK',
      lines,
    });
    await salesInvoiceService.confirm(entityManager, invoice);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
