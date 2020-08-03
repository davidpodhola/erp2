import { Column, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { SalesInvoiceLine } from './sales.invoice.line';
import { TaxModel } from './tax.model';
import { EntityBase } from './entity.base';

@Entity()
@ObjectType()
export class Tax extends EntityBase implements TaxModel {
  @Column()
  @Field()
  displayName: string;

  @Column()
  @Field()
  ratePercent: number;

  @Column()
  @Field()
  isStandard: boolean;

  @OneToMany(
    () => SalesInvoiceLine,
    salesInvoiceLine => salesInvoiceLine.lineTax
  )
  salesInvoiceLine: Promise<Array<SalesInvoiceLine>>;
}
