import { Address } from '../../../../../libs/model/src/lib/address';
import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

export interface HasNote {
  note: string;
}

@Entity({ name: 'address' })
@ObjectType('address')
export class CustomAddress extends Address implements HasNote {
  @Column()
  @Field()
  note: string;
}
