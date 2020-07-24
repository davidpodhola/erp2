import { Inject, Injectable } from '@nestjs/common';
import { AddressService, AddressServiceKey } from '@erp2/model';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: `Welcome to api!` };
  }
}
