import { BaseModel, DocumentNumberSequence, OrganizationModel } from '@erp2/model';
import { EntityManager } from 'typeorm/index';
import { Injectable } from '@nestjs/common';

export const DocumentNumberingServiceKey = 'DocumentNumberingService';

@Injectable()
export class DocumentNumberingService  {
  async getNextDocumentNumber<M extends BaseModel>(
    manager: EntityManager,
    modelCtor: (new () => M) | Function,
    organization: OrganizationModel
  ): Promise<string> {
    const model = await manager.getRepository(DocumentNumberSequence).findOne({
      where: { forType: modelCtor.name, organization },
      order: { id: 'DESC' }
    });
    const result = model.current;
    model.current = +model.current + 1;
    await manager.save(model);
    return result.toString();
  }
}
