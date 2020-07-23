import { MigrationInterface, QueryRunner } from 'typeorm';
import { _moduleRef } from '../migration.service';
import {
  AddressService,
  AddressServiceKey,
} from '../../../../../libs/model/src/lib/address.service';
import {
  CountryService,
  CountryServiceKey,
} from '../../../../../libs/model/src/lib/country.service';

export class CreateAnAddress1595508635328 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const entityManager = queryRunner.manager;
    const countryService: CountryService = _moduleRef.get(CountryServiceKey);
    await countryService.save(entityManager, {
      isoCode: 'ABC',
      displayName: 'A Country',
    });

    const addressService: AddressService = _moduleRef.get(AddressServiceKey);
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
    /* not supported */
  }
}
