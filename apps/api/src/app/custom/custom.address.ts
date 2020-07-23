import { Address } from '../../../../../libs/model/src/lib/address';
import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity({name: 'address'})
@ObjectType('address')
export class CustomAddress extends Address {
  @Column()
  @Field()
  note: string;
}
