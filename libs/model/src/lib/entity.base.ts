import { Field, ObjectType } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export abstract class EntityBase {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @UpdateDateColumn({
    nullable: false,
  })
  updtTs: Date;

  @Field()
  @Column({
    default: 0,
    nullable: false,
  })
  updtOpId: number;

  @Field()
  @Column({
    default: true,
  })
  isActive: boolean; // no matter the value, the entity can be visible to client and it's down to the specific use case

  @Field()
  @Column({
    default: true,
  })
  isCurrent: boolean; // if set to false, entity shall not be visible to a client, i.e. it is "deleted"
}
