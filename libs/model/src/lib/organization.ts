import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { UniqueDisplayEntityBase } from './unique.display.entity.base';
import { OrganizationModel } from './organization.model';
import { Address } from './address';
import { AddressModel } from './address.model';
import { BankAccount } from './bank.account';
import { SalesInvoice } from './sales.invoice';
import { OneToMany } from 'typeorm/index';

@Entity()
@ObjectType()
export class Organization extends UniqueDisplayEntityBase
  implements OrganizationModel {
  @Column()
  @Field()
  contact: string;

  @Field((type) => Address)
  @ManyToOne(
    () => Address,
    (address) => address.organizationRegisteredAddresses,
    {
      nullable: true,
    }
  )
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

  @Field(type => BankAccount)
  @ManyToOne(
    type => BankAccount,
    bankAccount => bankAccount.organizations,
    { nullable: true }
  )
  bankAccount: BankAccount;

  @Field(type => [SalesInvoice], { nullable: true })
  @OneToMany(
    type => SalesInvoice,
    salesInvoice => salesInvoice.organization
  )
  salesInvoices: Array<SalesInvoice>;
}
