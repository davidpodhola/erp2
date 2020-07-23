import { Inject, Injectable } from '@nestjs/common';
import { AddressService, AddressServiceKey } from '../../../../libs/model/src/lib/address.service';
import { CountryService } from '../../../../libs/model/src/lib/country.service';

@Injectable()
export class AppService {
  constructor(
    @Inject(AddressServiceKey) public readonly addressService: AddressService,
  ) {
  }

  getData(): { message: string } {
    const  x = this.addressService.createEntity();
    x.zipCode = 'XYZ123456';

    return { message: `Welcome to api with ${JSON.stringify(x)}!` };
  }
}
