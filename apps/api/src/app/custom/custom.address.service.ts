import {
  AddressModel,
  AddressSaveArgsModel,
  AddressService,
} from '@erp2/model';
import { Injectable } from '@nestjs/common';
import { CustomAddress, HasNote } from './custom.address';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CustomAddressService extends AddressService {
  createEntity(): AddressModel {
    const result = new CustomAddress();
    result.note = 'this is a note';
    return result;
  }

  protected async doSave(
    transactionalEntityManager,
    newAddress: AddressSaveArgsModel
  ): Promise<AddressModel> {
    return {
      note: 'this is a note',
      ...(await super.doSave(transactionalEntityManager, newAddress)),
    } as HasNote & AddressModel;
  }

  protected getRepository(
    transactionalEntityManager: EntityManager
  ): Repository<AddressModel> {
    return transactionalEntityManager.getRepository(CustomAddress);
  }
}
