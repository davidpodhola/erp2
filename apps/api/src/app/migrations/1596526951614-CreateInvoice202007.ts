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
  CustomerServiceKey, DocumentNumberSequence,
  OrganizationService,
  OrganizationServiceKey,
  ProductService,
  ProductServiceKey, SalesInvoice,
  SalesInvoiceLineSaveArgsModel,
  SalesInvoiceService, SalesInvoiceServiceKey, TaxService, TaxServiceKey
} from '@erp2/model';
import { BaseMigration } from '../migration.service';

export class CreateInvoice2020071596526951614 extends BaseMigration implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const entityManager = queryRunner.manager;
      const organizationService: OrganizationService = this.moduleRef.get(
        OrganizationServiceKey
      );
      const currencyService: CurrencyService = this.moduleRef.get(
        CurrencyServiceKey
      );
      const bankService: BankService = this.moduleRef.get(
        BankServiceKey
      );
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

      const taxService : TaxService = this.moduleRef.get(
        TaxServiceKey
      );

      const czechia = await countryService.save(entityManager, {
        isoCode: 'CZ',
        displayName: 'Czech Republic',
      });

      const czk = await currencyService.save(entityManager, {
        displayName: 'Kč',
        isoCode: 'CZK'
      });

      const eur = await currencyService.save(entityManager, {
        displayName: 'EUR',
        isoCode: 'EUR'
      });

      const bank = await bankService.save(entityManager,{
        bankIdentifierCode: 'FIOBCZPPXXX',
        displayName: 'FIO'
      });

      const bankAccount = await bankAccountService.save(entityManager,{
        bank: bank,
        displayName: 'FIO',
        bankAccountCustomerPrintableNumber: ('2600387156/2010'),
        iban: ('CZ4820100000002600387156'),
        swift: 'FIOBCZPPXXX'
      });

      const accountingScheme = await accountingSchemeService.save(entityManager,{
        displayName: 'main czk',
        currency: czk
      });
      const organization = await organizationService.save(entityManager, {
        displayName: 'NUCZ',
        legalName: ('NašeÚkoly.CZ s.r.o.'),
        legalAddress: {
          city: ('Praha 10 Vinohrady'),
          line1: ('Korunní 2569/108a'),
          zipCode: ('10100'),
          countryIsoCode: 'CZ'
        },
        bankAccount,
        accountingScheme,
        registration: (
          'Spisová značka C 186129 vedená u Městského soudu v Praze'
        ),
        contact: ('info@naseukoly.cz'),
        idNumber: ('24180149'),
        vatNumber: 'CZ24180149',
      });

      const expertWorks = await productService.save(entityManager, {
          displayName: 'Expertní práce',
          sku: 'EX',
        }
      );

      const standardTax = await taxService.save(entityManager,{
        displayName: '21%',
        ratePercent: 21,
        isStandard: true
      });

      const documentNumberSequence = new DocumentNumberSequence();
      documentNumberSequence.current = 20201014;
      documentNumberSequence.forType = SalesInvoice.name;
      documentNumberSequence.organization = organization;
      await entityManager.save(documentNumberSequence);

      const evalue = await customerService.save(entityManager, {
        legalAddress: {
          country: czechia,
          city: ('Praha 3 Žižkov'),
          line1: ('Jičínská 1616/29'),
          zipCode: ('13000')
        },
        displayName: ('evalue'),
        legalName: ('eValue.cz s.r.o.'),
        vatNumber: ('CZ03841812'),
        invoicingEmail: ('lukas.tomasek@evalue.cz'),
        idNumber: ('03841812')
      });

      const issuedOn = new Date(2020, 7 - 1, 31);
      const lines: SalesInvoiceLineSaveArgsModel[] = [
        {
          lineTax: null,
          product: expertWorks,
          linePrice: 94996,
          quantity: 108.567,
          narration: ('Vývoj projektu TEAS (Carvago) v červenci 2020'),
          lineOrder: 1
        },
      ];
      const invoice = await salesInvoiceService.save(entityManager,{
        customer: evalue,
        organization,
        paymentTermInDays: 14,
        transactionDate: issuedOn,
        issuedOn,
        currency: czk,
        lines,
      });
      await salesInvoiceService.confirm(entityManager, invoice);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
