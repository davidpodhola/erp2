import { BaseModel } from './base.model';
import { BankModel } from './bank.model';

export interface BankAccountModel extends BaseModel {
  bank: BankModel;
  bankAccountCustomerPrintableNumber: string;
  iban: string;
  swift: string;
}
