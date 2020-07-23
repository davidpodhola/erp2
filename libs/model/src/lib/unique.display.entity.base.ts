import { EntityBase } from './entity.base';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Index } from 'typeorm';

@ObjectType()
export abstract class UniqueDisplayEntityBase extends EntityBase {
  @Column()
  @Field()
  @Index({ unique: true })
  displayName: string;
}
