import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Currency } from './currency';
import { EntityBase } from '@erp2/model';
import { CurrencyRateModel } from './currency.rate.model';
import { CurrencyModel } from './currency.model';
import { PrimaryGeneratedColumn } from 'typeorm/index';

@Entity()
@ObjectType()
export class CurrencyRate extends EntityBase implements CurrencyRateModel {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float8' })
  @Field()
  currencyMultiplyingRate: number;
  @Column({ type: 'date' })
  @Field()
  end: Date;
  @Field(type => Currency)
  @ManyToOne(
    type => Currency,
    currency => currency.currencyRatesFrom,
    { nullable: false }
  )
  from: CurrencyModel;
  @Column({ type: 'date' })
  @Field()
  start: Date;
  @Field(type => Currency)
  @ManyToOne(
    type => Currency,
    currency => currency.currencyRatesTo,
    { nullable: false }
  )
  to: CurrencyModel;
}
