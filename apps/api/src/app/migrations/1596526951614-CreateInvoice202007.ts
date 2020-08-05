import {MigrationInterface, QueryRunner} from "typeorm";
import { CountryService, CountryServiceKey, OrganizationService, OrganizationServiceKey } from '@erp2/model';
import { BaseMigration } from '../migration.service';
import { CurrencyService, CurrencyServiceKey } from '../../../../../libs/model/src/lib/currency.service';
import { BankService, BankServiceKey } from '../../../../../libs/model/src/lib/bank.service';
import { BankAccountService, BankAccountServiceKey } from '../../../../../libs/model/src/lib/bank.account.service';
import {
  AccountingSchemeService,
  AccountingSchemeServiceKey
} from '../../../../../libs/model/src/lib/accounting.scheme.service';

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

      await countryService.save(entityManager, {
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
      let organization = await organizationService.save(entityManager, {
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

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
