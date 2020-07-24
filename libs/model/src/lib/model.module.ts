import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { AddressService } from './address.service';

@Module({
  controllers: [],
  providers: [],
  exports: [OrganizationService, AddressService],
})
export class ModelModule {}
