import { Injectable, OnModuleInit } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { ModuleRef } from '@nestjs/core';

let _moduleRef: ModuleRef = null;

export class BaseMigration {
  get moduleRef(): ModuleRef {
    return _moduleRef;
  }
}

@Injectable()
export class MigrationService implements OnModuleInit {
  constructor(
    @InjectConnection() readonly connection: Connection,
    moduleRef: ModuleRef
  ) {
    _moduleRef = moduleRef;
  }

  async onModuleInit(): Promise<void> {
    console.log('Running migrations...');
    await this.connection.runMigrations({
      transaction: 'all',
    });
  }
}
