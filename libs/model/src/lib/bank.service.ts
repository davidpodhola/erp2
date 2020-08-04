import { BaseEntityService } from '@erp2/model';
import { BankModel } from './bank.model';
import { BankSaveArgsModel } from './bank.save.args.model';
import { EntityManager, Repository } from 'typeorm/index';
import { Bank } from './bank';

export const BankServiceKey = 'BankService';

export class BankService extends BaseEntityService<
  BankModel,
  BankSaveArgsModel
> {
  createEntity(): BankModel {
    return new Bank();
  }

  protected getRepository(transactionalEntityManager): Repository<BankModel>{
    return transactionalEntityManager.getRepository(Bank);
  }
  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: BankSaveArgsModel,
    bank: BankModel
  ): Promise<BankModel> {
    bank.displayName = args.displayName;
    bank.bankIdentifierCode = args.bankIdentifierCode;
    return bank;
  }

  typeName(): string {
    return BankServiceKey;
  }
}
