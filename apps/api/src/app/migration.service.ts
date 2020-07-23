import { Injectable, OnModuleInit } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { ModuleRef } from '@nestjs/core';

export let _moduleRef: ModuleRef = null;

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
