import { Address } from '@erp2/model';
import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

export interface HasNote {
  note: string;
}

@Entity({ name: 'address' })
@ObjectType('address')
export class CustomAddress extends Address implements HasNote {
  @Column({nullable: true})
  @Field({nullable: true})
  note: string;
}
