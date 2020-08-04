import { BaseSaveArgsModel } from '@erp2/model';
import { BankModel } from './bank.model';

export interface BankAccountSaveArgsModel extends BaseSaveArgsModel {
  bankId?: number;
  bank?: BankModel;
  displayName: string;
  bankAccountCustomerPrintableNumber: string;
  iban: string;
  swift: string;
}
