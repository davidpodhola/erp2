import { BaseModel } from './base.model';
import { BaseSaveArgsModel } from './base.save.args.model';
import { EntityManager, Repository } from 'typeorm';

export abstract class BaseEntityService<
  T extends BaseModel,
  S extends BaseSaveArgsModel
> {
  abstract createEntity(): T;
  protected abstract getRepository(
    transactionalEntityManager: EntityManager
  ): Repository<T>;
  protected abstract async doSave(
    transactionalEntityManager: EntityManager,
    args: S,
    entity: T
  ): Promise<T>;

  loadEntity = async (
    transactionalEntityManager: EntityManager,
    id: number
  ): Promise<T> =>
    await this.getRepository(transactionalEntityManager).findOne(id);
  loadEntities = async (
    transactionalEntityManager: EntityManager
  ): Promise<Array<T>> =>
    await this.getRepository(transactionalEntityManager).find();
  async save(transactionalEntityManager: EntityManager, args: S): Promise<T> {
    const entity = args.id
      ? await this.loadEntity(transactionalEntityManager, args.id)
      : await this.createEntity();
    return await this.doSave(transactionalEntityManager, args, entity);
  }
  persist = async (
    transactionalEntityManager: EntityManager,
    t: T
  ): Promise<T> => await this.getRepository(transactionalEntityManager).save(t);
  delete = async (
    transactionalEntityManager: EntityManager,
    t: T
  ): Promise<void> => {
    await this.getRepository(transactionalEntityManager).remove(t);
  };
}
