import { BaseEntityService } from './base.entity.service';
import { ProductModel } from './product.model';
import { ProductSaveArgsModel } from './product.save.args.model';
import { EntityManager, Repository } from 'typeorm/index';
import { Organization, Product } from '@erp2/model';
import { Injectable } from '@nestjs/common';

export const ProductServiceKey = 'ProductService';

@Injectable()
export class ProductService extends BaseEntityService<
  ProductModel,
  ProductSaveArgsModel
> {
  createEntity(): ProductModel {
    return new Product();
  }

  protected getRepository(transactionalEntityManager): Repository<ProductModel>{
    return transactionalEntityManager.getRepository(Organization);
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: ProductSaveArgsModel,
    entity: ProductModel
  ): Promise<ProductModel> {
    entity.displayName = args.displayName;
    entity.sku = args.sku;
    return entity;
  }

  typeName(): string {
    return ProductServiceKey;
  }
}
