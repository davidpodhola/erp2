import { Column, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BankAccount } from './bank.account';
import { BankModel } from './bank.model';
import { UniqueDisplayEntityBase } from '@erp2/model';

@Entity()
@ObjectType()
export class Bank extends UniqueDisplayEntityBase implements BankModel {
  @Column()
  @Field()
  bankIdentifierCode: string;

  @Field(type => [BankAccount], { nullable: true })
  @OneToMany(
    type => BankAccount,
    bankAccount => bankAccount.bank
  )
  bankAccounts: Promise<Array<BankAccount>>;
}
