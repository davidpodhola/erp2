import { BaseSaveArgsModel } from './base.save.args.model';
import { CustomerModel } from '../entities/customer.model';
import { OrganizationModel } from '../entities/organization.model';
import { CurrencyModel } from '../entities/currency.model';
import { SalesInvoiceLineSaveArgsModel } from './sales.invoice.line.save.args.model';

export interface SalesInvoiceSaveArgsModel extends BaseSaveArgsModel {
  customer?: CustomerModel;
  customerDisplayName?: string;
  organization?: OrganizationModel;
  organizationDisplayName?: string;
  paymentTermInDays: number;
  issuedOn: Date;
  transactionDate: Date;
  currency?: CurrencyModel;
  currencyIsoCode?: string;
  lines: Array<SalesInvoiceLineSaveArgsModel>;
}
