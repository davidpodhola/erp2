import { Inject, Injectable } from '@nestjs/common';
import { BaseEntityService } from './base.entity.service';
import { OrganizationModel } from './organization.model';
import { OrganizationSaveArgsModel } from './organization.save.args.model';
import { Organization } from './organization';
import { EntityManager, Repository } from 'typeorm';
import { AddressService, AddressServiceKey } from './address.service';

export const OrganizationServiceKey = 'OrganizationService';

@Injectable()
export class OrganizationService extends BaseEntityService<OrganizationModel, OrganizationSaveArgsModel>{
  constructor(
    @Inject(AddressServiceKey) public readonly addressService: AddressService,
    ) {
    super();
  }

  createEntity(): OrganizationModel {
    return new Organization();
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: OrganizationSaveArgsModel,
    organization: OrganizationModel,
  ): Promise<OrganizationModel> {
    organization.contact = args.contact;
    organization.registration = args.registration;
    organization.displayName = args.displayName;
    organization.legalName = args.legalName;
    organization.legalAddress = await this.addressService.save(transactionalEntityManager, args.legalAddress);
    organization.idNumber = args.idNumber;

    return organization;
  }

  protected getRepository(transactionalEntityManager: EntityManager): Repository<OrganizationModel> {
    return transactionalEntityManager.getRepository(Organization);
  }

}
