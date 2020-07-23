import { Column, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { CountryModel } from './country.model';
import { UniqueDisplayEntityBase } from './unique.display.entity.base';
import { Address } from './address';
import { AddressModel } from './address.model';

const euMembersISOCodes = [
  'BE',
  'EL',
  'LT',
  'PT',
  'BG',
  'ES',
  'LU',
  'RO',
  'CZ',
  'FR',
  'HU',
  'SI',
  'DK',
  'HR',
  'MT',
  'SK',
  'DE',
  'IT',
  'NL',
  'FI',
  'EE',
  'CY',
  'AT',
  'SE',
  'IE',
  'LV',
  'PL',
  'UK',
];

@Entity()
@ObjectType()
export class Country extends UniqueDisplayEntityBase implements CountryModel {
  get isEUMember(): boolean {
    return euMembersISOCodes.indexOf(this.isoCode) >= 0;
  }

  @Column({ unique: true })
  @Field()
  isoCode: string;

  @Field((type) => [Address], { nullable: true })
  @OneToMany((type) => Address, (address) => address.country)
  addresses: Promise<Array<AddressModel>>;
}
