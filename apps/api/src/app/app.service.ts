import { Inject, Injectable } from '@nestjs/common';
import { AddressService, AddressServiceKey } from '@erp2/model';

@Injectable()
export class AppService {
  constructor(
    @Inject(AddressServiceKey) public readonly addressService: AddressService
  ) {}

  getData(): { message: string } {
    const x = this.addressService.createEntity();
    x.zipCode = 'XYZ123456';

    return { message: `Welcome to api with ${JSON.stringify(x)}!` };
  }
}
