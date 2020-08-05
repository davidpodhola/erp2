import {
  AccountingScheme,
  Address, Bank, BankAccount,
  Country,
  Currency, CurrencyRate,
  Customer, DocumentNumberSequence,
  Organization, Product,
  SalesInvoice, SalesInvoiceLine,
  SalesInvoiceVat, Tax
} from '@erp2/model';

export const entities = [
  Address,
  Country,
  Organization,
  SalesInvoiceVat,
  SalesInvoice,
  Currency,
  AccountingScheme,
  Customer,
  Bank,
  BankAccount,
  CurrencyRate,
  DocumentNumberSequence,
  Tax,
  SalesInvoiceLine,
  Product,
];
