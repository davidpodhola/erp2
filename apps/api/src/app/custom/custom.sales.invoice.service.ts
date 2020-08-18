import { SalesInvoiceSaveArgsModel, SalesInvoiceService } from '@erp2/model';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm/index';
import * as _ from 'lodash';

@Injectable()
export class CustomSalesInvoiceService extends SalesInvoiceService {
  async checkSaveArgs(
    transactionalEntityManager: EntityManager,
    args: SalesInvoiceSaveArgsModel
  ) {
    console.log('*** args', args);

    const organization = await this.getOrganization(
      transactionalEntityManager,
      args
    );
    if (organization.displayName === 'NUCZ') {
      const invoices = await this.getRepository(transactionalEntityManager)
        .createQueryBuilder('invoice')
        .where(
          `invoice.organization = :organizationId AND invoice."transactionDate">='2020-01-01' AND invoice."transactionDate"<='2020-12-31' `,
          {
            organizationId: organization.id,
          }
        ).getMany();
      const total = _.sum(invoices.map((x) => x.totalLinesAccountingSchemeCurrency));
      console.log('*** total', total);

      console.log('*** invoices', invoices);
    }
  }
}
