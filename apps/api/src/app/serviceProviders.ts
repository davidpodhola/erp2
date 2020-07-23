import { AddressServiceKey } from '../../../../libs/model/src/lib/address.service';
import {
  CountryService,
  CountryServiceKey,
} from '../../../../libs/model/src/lib/country.service';
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
