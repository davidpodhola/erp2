import { Column, Entity, Index, OneToMany } from 'typeorm/index';
import { Field, ObjectType } from '@nestjs/graphql';
import { UniqueDisplayEntityBase } from '@erp2/model';
import { ProductModel } from './product.model';
import { SalesInvoiceLine } from './sales.invoice.line';

@Entity()
@ObjectType()
export class Product extends UniqueDisplayEntityBase implements ProductModel {
  @Field(() => [SalesInvoiceLine], { nullable: true })
  @OneToMany(
    () => SalesInvoiceLine,
    salesInvoiceLine => salesInvoiceLine.product
  )
  salesInvoiceLine: Promise<Array<SalesInvoiceLine>>;

  @Column()
  @Field()
  @Index({ unique: true })
  sku: string;
}
