import { Column, Entity, ManyToOne, OneToMany } from 'typeorm/index';
import { Field, ObjectType } from '@nestjs/graphql';
import { Organization, UniqueDisplayEntityBase } from '@erp2/model';
import { BankAccountModel } from './bank.account.model';
import { Bank } from './bank';
import { BankModel } from './bank.model';
import { SalesInvoice } from './sales.invoice';

@Entity()
@ObjectType()
export class BankAccount extends UniqueDisplayEntityBase
  implements BankAccountModel {
  @Column()
  @Field()
  iban: string;

  @Column()
  @Field()
  swift: string;
  @Field(type => Bank)
  @ManyToOne(
    type => Bank,
    bank => bank.bankAccounts,
    { nullable: false }
  )
  bank: BankModel;

  @Column()
  @Field()
  bankAccountCustomerPrintableNumber: string;

  @Field(type => [SalesInvoice], { nullable: true })
  @OneToMany(
    type => SalesInvoice,
    salesInvoice => salesInvoice.bankAccount
  )
  salesInvoices: Array<SalesInvoice>;

  @Field(type => [Organization], { nullable: true })
  @OneToMany(
    type => Organization,
    organization => organization.bankAccount
  )
  organizations: Array<Organization>;
}
