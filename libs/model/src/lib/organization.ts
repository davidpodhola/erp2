import { Entity, Column, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { UniqueDisplayEntityBase } from './unique.display.entity.base';
import { OrganizationModel } from './organization.model';
import { Address } from './address';
import { AddressModel } from './address.model';

@Entity()
@ObjectType()
export class Organization extends UniqueDisplayEntityBase implements OrganizationModel {
  @Column()
  @Field()
  contact: string;

  @Field((type) => Address)
  @ManyToOne((type) => Address, (address) => address.organizationRegisteredAddresses, {
    nullable: true,
  })
  legalAddress: AddressModel;

  @Column()
  @Field()
  legalName: string;

  @Column()
  @Field()
  registration: string;

  @Column()
  @Field()
  idNumber: string;
}
