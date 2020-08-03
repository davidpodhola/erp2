import { ObjectType, Field } from '@nestjs/graphql';

import { Entity, Column, ManyToOne } from 'typeorm/index';
import { EntityBase } from './entity.base';
import { TaxModel } from './tax.model';
import { SalesInvoiceModel } from './sales.invoice.model';
import { ProductModel } from './product.model';
import { Tax } from './tax';
import { Product } from './product';

@Entity()
@ObjectType()
export class SalesInvoiceLine extends EntityBase {
  /* Sales line start
   */
  @Column()
  @Field()
  lineOrder: number;

  @Field(() => Tax)
  @ManyToOne(
    () => Tax,
    tax => tax.salesInvoiceLine,
    { nullable: false }
  )
  lineTax: TaxModel;

  @Column({ type: 'float8' })
  @Field()
  linePrice: number;

  @Field(() => Product)
  @ManyToOne(
    () => Product,
    product => product.salesInvoiceLine,
    { nullable: false }
  )
  product: ProductModel;

  @Column({ type: 'float8' })
  @Field()
  quantity: number;

  @Field(() => SalesInvoice)
  @ManyToOne(
    () => SalesInvoice,
    salesInvoice => salesInvoice.lines,
    { nullable: false }
  )
  invoice: SalesInvoiceModel;
}
