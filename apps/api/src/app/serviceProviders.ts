import { AddressService, AddressServiceKey } from '../../../../libs/model/src/lib/address.service';
import { CountryService, CountryServiceKey } from '../../../../libs/model/src/lib/country.service';

const addressServiceProvider = {
  provide: AddressServiceKey,
  useClass: AddressService
}

const countryServiceProvider = {
  provide: CountryServiceKey,
  useClass: CountryService
}

export const serviceProviders = [
  addressServiceProvider,
  countryServiceProvider,
]

