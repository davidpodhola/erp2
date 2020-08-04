import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { SalesInvoice } from './sales.invoice';
import { EntityBase } from '@erp2/model';
import { SalesInvoiceVatModel } from './sales.invoice.vat.model';

@Entity()
@ObjectType()
export class SalesInvoiceVat extends EntityBase
  implements SalesInvoiceVatModel {
  @Field(() => SalesInvoice)
  @ManyToOne(
    () => SalesInvoice,
    salesInvoice => salesInvoice.vatReport,
    { nullable: false }
  )
  invoice: SalesInvoice;

  @Column({ type: 'numeric', scale: 2, precision: 12 })
  @Field()
  vatRatePercent: number;

  @Column({ type: 'float8' })
  @Field()
  vatTotalAccountingSchemeCurrencyRaw: number;

  @Column({ type: 'float8' })
  @Field()
  vatTotalRaw: number;

  @Column({ type: 'numeric', scale: 2, precision: 12 })
  @Field()
  vatTotalAccountingSchemeCurrency: number;

  @Column({ type: 'numeric', scale: 2, precision: 12 })
  @Field()
  vatTotal: number;

  displayName = '';
}
