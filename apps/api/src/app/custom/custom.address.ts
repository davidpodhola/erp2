import { Address } from '../../../../../libs/model/src/lib/address';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { CountryModel } from '../../../../../libs/model/src/lib/country.model';
import { CustomCountry } from './custom.country';

@Entity({name: 'address'})
@ObjectType('address')
export class CustomAddress extends Address {
  @Field(() => CustomCountry)
  @ManyToOne(() => CustomCountry, (country) => country.addresses, { nullable: false })
  country: CountryModel;

  @Column()
  @Field()
  note: string;
}
