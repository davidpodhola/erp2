import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  AddressService,
  AddressServiceKey,
  CountryService,
  CountryServiceKey,
} from '@erp2/model';
import { getService } from '@erp2/model';

export class CreateAnAddress1595508635328 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const entityManager = queryRunner.manager;
    const countryService: CountryService = getService(CountryServiceKey);
    await countryService.save(entityManager, {
      isoCode: 'ABC',
      displayName: 'A Country',
    });

    const addressService: AddressService = getService(AddressServiceKey);
    const address = addressService.createEntity();
    address.city = 'City';
    address.zipCode = 'ABC 123';
    address.line1 = 'Street 1';
    await addressService.save(entityManager, {
      city: address.city,
      line1: address.line1,
      zipCode: address.zipCode,
      countryIsoCode: 'ABC',
    });
  }

  public async down(): Promise<void> {
    /* intentionally empty */
  }
}
