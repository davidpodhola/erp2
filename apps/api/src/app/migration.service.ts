import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { ModuleReferenceService } from './module.reference.service';

@Injectable()
export class MigrationService implements OnModuleInit {
  constructor(
    @InjectConnection() readonly connection: Connection,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Inject() moduleReferenceService: ModuleReferenceService,
  ) {
  }

  async onModuleInit(): Promise<void> {
    console.log('Running migrations...');
    await this.connection.runMigrations({
      transaction: 'all',
    });
  }
}
