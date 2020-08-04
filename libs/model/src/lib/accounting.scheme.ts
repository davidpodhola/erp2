import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Currency } from './currency';
import { Organization } from './organization';
import { UniqueDisplayEntityBase } from '@erp2/model';
import { AccountingSchemeModel } from './accounting.scheme.model';
import { CurrencyModel } from './currency.model';

@Entity()
@ObjectType()
export class AccountingScheme extends UniqueDisplayEntityBase
  implements AccountingSchemeModel {
  @Field(type => Currency)
  @ManyToOne(
    type => Currency,
    currency => currency.accountingSchemas,
    { nullable: false }
  )
  currency: CurrencyModel;

  // do not propagate array of Organization to the client
  @OneToMany(
    type => Organization,
    organization => organization.accountingScheme
  )
  organizations: Promise<Array<Organization>>;
}
