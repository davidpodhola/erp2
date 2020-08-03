import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm/index';
import { Field, ObjectType } from '@nestjs/graphql';
import { CustomerModel } from './customer.model';
import { Address, UniqueDisplayEntityBase } from '@erp2/model';
import { SalesInvoice } from './sales.invoice';

@Entity()
@ObjectType()
export class Customer extends UniqueDisplayEntityBase implements CustomerModel {
  @Field(type => Address)
  @ManyToOne(
    type => Address,
    address => address.customerRegistratedAddresses,
    { nullable: false }
  )
  legalAddress: Address;


  @Column()
  @Field()
  @Index({ unique: true })
  legalName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  @Index({ unique: true })
  vatNumber?: string;

  @Field(type => [SalesInvoice], { nullable: true })
  @OneToMany(
    type => SalesInvoice,
    salesInvoice => salesInvoice.customer
  )
  salesInvoices: Promise<Array<SalesInvoice>>;

  @Column()
  @Field()
  invoicingEmail: string;

  @Column()
  @Field()
  idNumber: string;
}
