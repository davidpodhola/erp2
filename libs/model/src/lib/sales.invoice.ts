import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { Customer } from './customer';
import { Organization } from './organization';
import { Currency } from './currency';
import { SalesInvoiceLine } from './sales.invoice.line';
import { BankAccount } from './bank.account';
import { SalesInvoiceVat } from './sales.invoice.vat';
import { EntityBase } from '@erp2/model';
import { SalesInvoiceModel } from './sales.invoice.model';
import { SalesInvoiceVatModel } from './sales.invoice.vat.model';
import { LanguageModel } from './language.model';

@Entity()
@ObjectType()
export class SalesInvoice extends EntityBase implements SalesInvoiceModel {
  @Field(() => BankAccount)
  @ManyToOne(
    () => BankAccount,
    bankAccount => bankAccount.salesInvoices,
    { nullable: false }
  )
  bankAccount: BankAccount;

  @Column({ type: 'date' })
  @Field()
  dueDate: Date;

  @Column({ type: 'date' })
  @Field()
  issuedOn: Date;

  @Field(() => Organization)
  @ManyToOne(
    () => Organization,
    organization => organization.salesInvoices,
    { nullable: false }
  )
  organization: Organization;

  @Field(() => Currency)
  @ManyToOne(
    () => Currency,
    currency => currency.salesInvoices,
    { nullable: false }
  )
  currency: Currency;

  @Field(() => Customer)
  @ManyToOne(
    () => Customer,
    customer => customer.salesInvoices,
    { nullable: false }
  )
  customer: Customer;

  get displayName(): string {
    return this.isDraft ? `#${this.id}` : `${this.documentNo}`;
  }

  @Column({ nullable: true })
  @Field({ nullable: true })
  documentNo?: string;

  @Column()
  @Field()
  isDraft: boolean;

  @Column()
  @Field()
  isCalculated: boolean;

  @Column({ type: 'numeric', scale: 2, precision: 12 })
  @Field()
  grandTotal: number;

  @Field(() => [SalesInvoiceLine], { nullable: true })
  @OneToMany(
    () => SalesInvoiceLine,
    salesInvoiceLine => salesInvoiceLine.invoice
  )
  lines: Array<SalesInvoiceLine>;

  @Column()
  @Field()
  narration: string;

  @Column({ type: 'float8' })
  @Field()
  totalLines: number;

  @Column({ type: 'float8' })
  @Field()
  totalLinesAccountingSchemeCurrency: number;

  @Column({ type: 'numeric', scale: 2, precision: 12 })
  @Field()
  grandTotalAccountingSchemeCurrency: number;

  @Column({ type: 'float8' })
  @Field()
  currencyMultiplyingRateToAccountingSchemeCurrency: number;

  @Column({ type: 'date' })
  @Field()
  transactionDate: Date;

  @Field(() => [SalesInvoiceVat], { nullable: true })
  @OneToMany(
    () => SalesInvoiceVat,
    salesInvoiceVat => salesInvoiceVat.invoice
  )
  vatReport: Array<SalesInvoiceVatModel>;

  @Column({ nullable: true })
  @Field({ nullable: true })
  printDate: Date;

  @Column({ default: false })
  @Field()
  printed: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  printError?: string;

  @Field(() => String, { nullable: true })
  @Column('bytea', { nullable: true })
  content?: string;

  @Column()
  @Field()
  paymentTermInDays: number;

  get printLanguage(): LanguageModel {
    // TODO: return languages.find(x => x.isoCode === this.printLanguageIsoCode);
    return null;
  }

  set printLanguage(value: LanguageModel) {
    this.printLanguageIsoCode = value.isoCode;
  }
  @Column()
  printLanguageIsoCode: string;

  @Column()
  @Field()
  reverseCharge: boolean;
}
