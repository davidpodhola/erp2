import { Column, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { UniqueDisplayEntityBase } from '@erp2/model';
import { CurrencyModel } from './currency.model';
import { SalesInvoice } from './sales.invoice';
import { SalesInvoiceModel } from './sales.invoice.model';
import { CurrencyRate } from './currency.rate';
import { CurrencyRateModel } from './currency.rate.model';
import { AccountingScheme } from './accounting.scheme';
import { AccountingSchemeModel } from './accounting.scheme.model';

@Entity()
@ObjectType()
export class Currency extends UniqueDisplayEntityBase implements CurrencyModel {
  @Column()
  @Field()
  isoCode: string;

  @OneToMany(
    type => SalesInvoice,
    salesInvoice => salesInvoice.currency
  )
  salesInvoices: Array<SalesInvoiceModel>;

  @Field(type => [CurrencyRate], { nullable: true })
  @OneToMany(
    type => CurrencyRate,
    currencyRate => currencyRate.from
  )
  currencyRatesFrom: Array<CurrencyRateModel>;

  @Field(type => [CurrencyRate], { nullable: true })
  @OneToMany(
    type => CurrencyRate,
    currencyRate => currencyRate.to
  )
  currencyRatesTo: Array<CurrencyRateModel>;

  @OneToMany(
    type => AccountingScheme,
    accountingScheme => accountingScheme.currency
  )
  accountingSchemas: Array<AccountingSchemeModel>;
}
