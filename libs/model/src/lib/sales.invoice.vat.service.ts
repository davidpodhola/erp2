import { BaseEntityService } from '@erp2/model';
import { SalesInvoiceVatModel } from './sales.invoice.vat.model';
import { SalesInvoiceVatSaveArgsModel } from './sales.invoice.vat.save.args.model';
import { EntityManager } from 'typeorm/index';

export const SalesInvoiceVatServiceKey = 'SalesInvoiceVatService';

export class SalesInvoiceVatService extends BaseEntityService<
  SalesInvoiceVatModel,
  SalesInvoiceVatSaveArgsModel
> {
  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: SalesInvoiceVatSaveArgsModel,
    salesInvoiceVatModel: SalesInvoiceVatModel
  ): Promise<SalesInvoiceVatModel> {
    salesInvoiceVatModel.vatTotal = args.vatTotal;
    salesInvoiceVatModel.vatTotalAccountingSchemeCurrency =
      args.vatTotalAccountingSchemeCurrency;
    salesInvoiceVatModel.vatRatePercent = args.vatRatePercent;
    salesInvoiceVatModel.vatTotalAccountingSchemeCurrencyRaw =
      args.vatTotalAccountingSchemeCurrencyRaw;
    salesInvoiceVatModel.vatTotalRaw = args.vatTotalRaw;
    salesInvoiceVatModel.displayName = '';
    salesInvoiceVatModel.invoice = args.invoice;
    return salesInvoiceVatModel;
  }

  typeName(): string {
    return SalesInvoiceVatServiceKey;
  }
}
