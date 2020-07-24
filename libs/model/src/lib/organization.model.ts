import { BaseModel } from './base.model';
import { AddressModel } from './address.model';

export interface OrganizationModel extends BaseModel {
  displayName: string;
  legalAddress: AddressModel;
  legalName: string;
  registration: string;
  contact: string;
  idNumber: string;
}
