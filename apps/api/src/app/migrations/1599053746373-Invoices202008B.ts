import {MigrationInterface, QueryRunner} from "typeorm";
import { getService, SalesInvoiceLineSaveArgsModel, SalesInvoiceService, SalesInvoiceServiceKey } from '@erp2/model';

export class Invoices202008B1599053746373 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const entityManager = queryRunner.manager;
      const salesInvoiceService: SalesInvoiceService = getService(
        SalesInvoiceServiceKey
      );

      const issuedOn = new Date(2020, 8 - 1, 31);
      const lines: SalesInvoiceLineSaveArgsModel[] = [
        {
          lineTaxIsStandard: true,
          productSku: `EX`,
          linePrice: (148-88) * 7000 / 8,
          quantity: (148-88),
          narration: 'Vývoj projektu TEAS (Carvago) v srpnu 2020',
          lineOrder: 1,
        },
      ];
      const invoice = await salesInvoiceService.save(entityManager, {
        customerDisplayName: 'evalue',
        organizationDisplayName : `NUCZ`,
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
          linePrice: 88 * 7000 / 8,
          quantity: 88,
          narration: 'Vývoj projektu TEAS (Carvago) v srpnu 2020',
          lineOrder: 1,
        },
      ];
      const invoice2 = await salesInvoiceService.save(entityManager, {
        customerDisplayName: 'evalue',
        organizationDisplayName : `DP`,
        paymentTermInDays: 14,
        transactionDate: issuedOn,
        issuedOn,
        currencyIsoCode: `CZK`,
        lines: lines2,
      });
      await salesInvoiceService.confirm(entityManager, invoice2);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      /* intentionally left blank */
    }

}
