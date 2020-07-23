import { Organization } from '../../../../../libs/model/src/lib/organization';
import { Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { AddressModel } from '../../../../../libs/model/src/lib/address.model';
import { CustomAddress } from './custom.address';

@Entity({name: 'organization'})
@ObjectType('organization')
export class CustomOrganization extends Organization {
  @Field(() => CustomAddress)
  @ManyToOne(() => CustomAddress, (address) => address.organizationRegisteredAddresses, {
    nullable: true,
  })
  legalAddress: AddressModel;

}
