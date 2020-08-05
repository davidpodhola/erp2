import { AddressServiceKey, serviceProviders as modelServiceProviders } from '@erp2/model';
import { CustomAddressService } from './custom/custom.address.service';

const addressServiceProvider = {
  provide: AddressServiceKey,
  useClass: CustomAddressService,
};

export const serviceProviders = [
  addressServiceProvider,
  ...(modelServiceProviders.filter((x) => x.provide !== AddressServiceKey ))
];
