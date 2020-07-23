import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { EntityBase } from './entity.base';
import { AddressModel } from './address.model';
import { Country } from './country';
import { CountryModel } from './country.model';
import { Organization } from './organization';
import { OrganizationModel } from './organization.model';

@Entity()
@ObjectType()
export class Address extends EntityBase implements AddressModel {
  @Field((type) => Country)
  @ManyToOne((type) => Country, (country) => country.addresses, { nullable: false })
  country: CountryModel;

  get displayName(): string {
    return `${this.line1}, ${this.zipCode} ${this.city}`;
  }

  @Column()
  @Field()
  line1: string;

  @Column()
  @Field()
  city: string;

  @Column()
  @Field()
  zipCode: string;

  @Field((type) => [Organization], { nullable: true })
  @OneToMany((type) => Organization, (organization) => organization.legalAddress)
  organizationRegisteredAddresses: Array<OrganizationModel>;
}
