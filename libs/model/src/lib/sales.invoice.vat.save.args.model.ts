import { BaseSaveArgsModel } from '@erp2/model';
import { SalesInvoiceModel } from './sales.invoice.model';

export interface SalesInvoiceVatSaveArgsModel extends BaseSaveArgsModel {
  vatRatePercent: number;
  vatTotalRaw: number;
  vatTotalAccountingSchemeCurrencyRaw: number;
  vatTotal: number;
  vatTotalAccountingSchemeCurrency: number;
  invoice: SalesInvoiceModel;
}
