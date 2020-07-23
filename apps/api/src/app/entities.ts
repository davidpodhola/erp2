import { CustomAddress } from './custom/custom.address';
import { CustomOrganization } from './custom/custom.organization';
import { CustomCountry } from './custom/custom.country';
import { Address } from '../../../../libs/model/src/lib/address';
import { Country } from '../../../../libs/model/src/lib/country';
import { Organization } from '../../../../libs/model/src/lib/organization';

export const entities = [
  CustomAddress,
  CustomCountry,
  CustomOrganization,
  Address,
  Country,
  Organization,
]
