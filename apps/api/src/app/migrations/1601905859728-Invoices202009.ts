import {MigrationInterface, QueryRunner} from "typeorm";
import {
  CurrencyRateService, CurrencyRateServiceKey,
  getService,
  SalesInvoiceLineSaveArgsModel,
  SalesInvoiceService,
  SalesInvoiceServiceKey
} from '@erp2/model';
import * as moment from 'moment';
import * as _ from 'lodash';

export class Invoices2020091601905859728 implements MigrationInterface {

  public async evalue(queryRunner: QueryRunner): Promise<void> {
    const entityManager = queryRunner.manager;
    const salesInvoiceService: SalesInvoiceService = getService(
      SalesInvoiceServiceKey
    );

    const issuedOn = new Date(2020, 9 - 1, 30);
    const lines: SalesInvoiceLineSaveArgsModel[] = [
      {
        lineTaxIsStandard: true,
        productSku: `EX`,
        linePrice: 0.5 * 145629,
        quantity: _.round((166+26/60)*0.5,2),
        narration: 'Vývoj projektu TEAS (Carvago) v září 2020',
        lineOrder: 1,
      },
    ];
    const invoice = await salesInvoiceService.save(entityManager, {
      customerDisplayName: 'evalue',
      organizationDisplayName: `NUCZ`,
      paymentTermInDays: 14,
      transactionDate: issuedOn,
      issuedOn,
      currencyIsoCode: `CZK`,
      lines,
    });
    await salesInvoiceService.confirm(entityManager, invoice);

    const lines2: SalesInvoiceLineSaveArgsModel[] = [
      {
        lineTaxIsStandard: true,
        productSku: `EX`,
        linePrice: 0.5 * 145629,
        quantity: _.round((166+26/60)*0.5,2),
        narration: 'Vývoj projektu TEAS (Carvago) v září 2020',
        lineOrder: 1,
      },
    ];
    const invoice2 = await salesInvoiceService.save(entityManager, {
      customerDisplayName: 'evalue',
      organizationDisplayName: `DP`,
      paymentTermInDays: 14,
      transactionDate: issuedOn,
      issuedOn,
      currencyIsoCode: `CZK`,
      lines: lines2,
    });
    await salesInvoiceService.confirm(entityManager, invoice2);
  }

  public async realityZaPrahou(queryRunner: QueryRunner): Promise<void> {
    const entityManager = queryRunner.manager;
    const currencyRateService: CurrencyRateService = getService(
      CurrencyRateServiceKey
    );
    const salesInvoiceService: SalesInvoiceService = getService(
      SalesInvoiceServiceKey
    );

    const issuedOn = new Date(2020, 9 - 1, 30);
    const start = moment(issuedOn).startOf('day').toDate();
    const end = moment(issuedOn).endOf('day').toDate();
    await currencyRateService.save(entityManager, {
      start,
      end,
      currencyMultiplyingRate: 27.210,
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
          'Licence Office 365 Business Premium na období 23.10.2020 do 22.11.2021',
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

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.evalue(queryRunner);
    await this.realityZaPrahou(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    /* intentionally left blank */
  }
}
