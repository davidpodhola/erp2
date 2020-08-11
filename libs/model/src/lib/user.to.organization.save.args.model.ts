import { BaseSaveArgsModel } from './base.save.args.model';
import { UserModel } from './user.model';
import { OrganizationModel } from '@erp2/model';

export interface UserToOrganizationSaveArgsModel extends BaseSaveArgsModel {
  user: UserModel;
  organization: OrganizationModel;
}
