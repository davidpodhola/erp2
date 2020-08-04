import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Organization } from './organization';
import { EntityBase, OrganizationModel } from '@erp2/model';

@Entity()
@ObjectType()
export class DocumentNumberSequence extends EntityBase {
  @Column()
  @Field()
  forType: string;

  @Column()
  @Field()
  current: number;

  @Field(type => Organization)
  @ManyToOne(
    type => Organization,
    organization => organization.documentNumberSequences,
    { nullable: false }
  )
  organization: OrganizationModel;
}
