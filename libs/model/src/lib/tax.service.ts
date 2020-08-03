import { TaxModel } from './tax.model';
import { BaseEntityService, Organization } from '@erp2/model';
import { TaxSaveArgsModel } from './tax.save.args.model';
import { Tax } from './tax';
import { EntityManager, Repository } from 'typeorm/index';

export const TaxServiceKey = 'TaxService';

export class TaxService extends BaseEntityService<
  TaxModel,
  TaxSaveArgsModel
> {
  createEntity(): TaxModel {
    return new Tax();
  }

  protected getRepository(transactionalEntityManager): Repository<TaxModel>{
    return transactionalEntityManager.getRepository(Tax);
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: TaxSaveArgsModel,
    tax: TaxModel
  ): Promise<TaxModel> {
    tax.ratePercent = args.ratePercent;
    tax.displayName = args.displayName;
    // TODO: if setting isStandard === true, remove old standard first
    tax.isStandard = args.isStandard;
    return tax;
  }

  typeName(): string {
    return TaxServiceKey;
  }
}
