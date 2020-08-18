import { Injectable } from '@nestjs/common';
import { BaseSaveArgsModel } from '@erp2/model';
import { EntityManager } from 'typeorm/index';

export const SaveArgsValidationServiceKey = 'SaveArgsValidationService';

@Injectable()
export class SaveArgsValidationService {
  async checkIsSaveArgValid<T extends BaseSaveArgsModel>(
    transactionalEntityManager: EntityManager,
    typeName: string,
    args: T
  ): Promise<void> {
    /* left intentionally empty for the real validation engine */
  }
}
