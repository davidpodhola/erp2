import {
  AddressServiceKey,
  CountryService,
  CountryServiceKey,
} from '@erp2/model';
import { CustomAddressService } from './custom/custom.address.service';

const addressServiceProvider = {
  provide: AddressServiceKey,
  useClass: CustomAddressService,
};

const countryServiceProvider = {
  provide: CountryServiceKey,
  useClass: CountryService,
};

export const serviceProviders = [
  addressServiceProvider,
  countryServiceProvider,
];
