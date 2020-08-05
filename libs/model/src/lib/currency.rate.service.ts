import { CurrencyRateModel } from './currency.rate.model';
import { CurrencyRateSaveArgsModel } from './currency.rate.save.args.model';
import { CurrencyModel } from './currency.model';
import { EntityManager, Repository } from 'typeorm/index';
import { Inject, Injectable } from '@nestjs/common';
import { CurrencyService, CurrencyServiceKey } from './currency.service';
import { BaseEntityService } from './base.entity.service';
import { OrganizationModel } from './organization.model';
import { CurrencyRate } from './entity.base';

export const CurrencyRateServiceKey = 'CurrencyRateService';

@Injectable()
export class CurrencyRateService extends BaseEntityService<
  CurrencyRateModel,
  CurrencyRateSaveArgsModel
> {
  constructor(
    @Inject(CurrencyServiceKey) protected readonly currencyService : CurrencyService,
  ) {
    super();
  }

  getAccountingForDateAndOrg: (
    transactionDate: Date,
    from: CurrencyModel,
    org: OrganizationModel
  ) => Promise<CurrencyRateModel>;

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: CurrencyRateSaveArgsModel,
    entity: CurrencyRateModel
  ): Promise<CurrencyRateModel> {
    const currencyService = this.currencyService;
    entity.currencyMultiplyingRate = args.currencyMultiplyingRate;
    entity.end = args.end;
    entity.start = args.start;
    entity.from =
      args.from
        ? args.from
        : await currencyService.getCurrency(transactionalEntityManager, args.fromIsoCode)
    ;
    entity.to =
      args.to ? args.to : await currencyService.getCurrency(transactionalEntityManager, args.toIsoCode)
    ;
    return entity;
  }

  typeName(): string {
    return CurrencyRateServiceKey;
  }

  createEntity(): CurrencyRateModel {
    return new CurrencyRate();
  }

  protected getRepository(transactionalEntityManager): Repository<CurrencyRateModel>{
    return transactionalEntityManager.getRepository(CurrencyRate);
  }
}
