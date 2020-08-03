import { SalesInvoiceModel } from './sales.invoice.model';
import { TaxModel } from './tax.model';
import { ProductModel } from './product.model';
import { BaseModel } from '@erp2/model';

export interface SalesInvoiceLineModel extends BaseModel {
  lineOrder: number;
  invoice: SalesInvoiceModel;
  lineTax: TaxModel;
  linePrice: number;
  product: ProductModel;
  quantity: number;
}
