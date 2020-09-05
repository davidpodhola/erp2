import {MigrationInterface, QueryRunner} from "typeorm";
import * as moment from 'moment';
import {
  CurrencyRateService,
  CurrencyRateServiceKey,
  getService,
  SalesInvoiceLineSaveArgsModel,
  SalesInvoiceService, SalesInvoiceServiceKey
} from '@erp2/model';

export class Invoices202008C1599277217737 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const entityManager = queryRunner.manager;
      const currencyRateService: CurrencyRateService = getService(
        CurrencyRateServiceKey
      );
      const salesInvoiceService: SalesInvoiceService = getService(
        SalesInvoiceServiceKey
      );

      const issuedOn = new Date(2020, 8 - 1, 31);
      const start = moment(issuedOn).startOf('day').toDate();
      const end = moment(issuedOn).endOf('day').toDate();
      await currencyRateService.save(entityManager, {
        start,
        end,
        currencyMultiplyingRate: 26.210,
        fromIsoCode: 'EUR',
        toIsoCode: 'CZK',
      });
      const lines: SalesInvoiceLineSaveArgsModel[] = [
        {
          lineTaxIsStandard: true,
          productSku: 'MS.O365.BP.M',
          linePrice: 4 * 12.7,
          quantity: 4,
          narration:
            'Licence Office 365 Business Premium na období 23.9.2020 do 22.10.2021',
          lineOrder: 1,
        },
      ];
      const invoice = await salesInvoiceService.save(entityManager, {
        customerDisplayName: 'RealityzaPrahou',
        organizationDisplayName: `NUCZ`,
        paymentTermInDays: 23,
        transactionDate: issuedOn,
        issuedOn,
        currencyIsoCode: `EUR`,
        lines,
      });
      await salesInvoiceService.confirm(entityManager, invoice);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      /* intentionally empty */
    }

}
