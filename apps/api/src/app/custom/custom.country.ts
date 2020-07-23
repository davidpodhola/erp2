import { Country } from '../../../../../libs/model/src/lib/country';
import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { AddressModel } from '../../../../../libs/model/src/lib/address.model';
import { CustomAddress } from './custom.address';

@Entity({name: 'country'})
@ObjectType('country')
export class CustomCountry extends Country {
  @Field(() => [CustomAddress], { nullable: true })
  @OneToMany(() => CustomAddress, (address) => address.country)
  addresses: Promise<Array<AddressModel>>;
}
