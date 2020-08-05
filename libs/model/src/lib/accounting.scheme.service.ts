import { AccountingScheme, BaseEntityService } from '@erp2/model';
import { AccountingSchemeModel } from './accounting.scheme.model';
import { AccountingSchemeSaveArgsModel } from './accounting.scheme.save.args.model';
import { EntityManager, Repository } from 'typeorm/index';
import { CurrencyService, CurrencyServiceKey } from './currency.service';
import { Inject, Injectable } from '@nestjs/common';

export const AccountingSchemeServiceKey = 'AccountingSchemeService';

@Injectable()
export class AccountingSchemeService extends BaseEntityService<
  AccountingSchemeModel,
  AccountingSchemeSaveArgsModel
> {
  createEntity(): AccountingSchemeModel {
    return new AccountingScheme();
  }

  constructor(
    @Inject(CurrencyServiceKey) protected readonly currencyService: CurrencyService) {
    super();
  }

  protected getRepository(transactionalEntityManager): Repository<AccountingSchemeModel>{
    return transactionalEntityManager.getRepository(AccountingScheme);
  }
  typeName(): string {
    return AccountingSchemeServiceKey;
  }
  async doSave(
    transactionalEntityManager: EntityManager,
    newAccountingScheme: AccountingSchemeSaveArgsModel,
    accountingScheme: AccountingSchemeModel
  ): Promise<AccountingSchemeModel> {
    accountingScheme.displayName = newAccountingScheme.displayName;
    accountingScheme.currency =
      newAccountingScheme.currency
        ? newAccountingScheme.currency
        : await this.currencyService.getCurrency(transactionalEntityManager, newAccountingScheme.currencyIsoCode)
    ;
    return accountingScheme;
  }
}
