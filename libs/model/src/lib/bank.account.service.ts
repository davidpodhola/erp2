import { BankAccount, BaseEntityService } from '@erp2/model';
import { BankAccountModel } from './bank.account.model';
import { BankAccountSaveArgsModel } from './bank.account.save.args.model';
import { EntityManager, Repository } from 'typeorm/index';
import { BankService, BankServiceKey } from './bank.service';
import { Inject } from '@nestjs/common';

export const BankAccountServiceKey = 'BankAccountService';

export class BankAccountService extends BaseEntityService<
  BankAccountModel,
  BankAccountSaveArgsModel
> {
  createEntity(): BankAccountModel {
    return new BankAccount();
  }

  constructor(
    @Inject(BankServiceKey) protected readonly bankService: BankService
  ) {
    super();

  }


  protected getRepository(transactionalEntityManager): Repository<BankAccountModel>{
    return transactionalEntityManager.getRepository(BankAccount);
  }
  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: BankAccountSaveArgsModel,
    bankAccountModel: BankAccountModel
  ): Promise<BankAccountModel> {
    bankAccountModel.displayName = args.displayName;
    bankAccountModel.swift = args.swift;
    bankAccountModel.iban = args.iban;
    bankAccountModel.bankAccountCustomerPrintableNumber =
      args.bankAccountCustomerPrintableNumber;
    bankAccountModel.bank =
      args.bank ? args.bank : await this.bankService.loadEntity(transactionalEntityManager, args.bankId)
    ;
    return bankAccountModel;
  }

  typeName(): string {
    return BankAccountServiceKey;
  }
}
