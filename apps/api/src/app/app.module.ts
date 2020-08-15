import { Inject, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { migrations } from './migrations';
import { MigrationService } from './migration.service';
import { serviceProviders } from './serviceProviders';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { resolvers } from './resolvers';
import { ModelModule } from '@erp2/model';
import { ModuleReferenceService } from '@erp2/model';
import { ModuleRef } from '@nestjs/core';

// typeOrm + list of entities from THIS application + try to enhance e.g. Organization

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',

      host: 'localhost',
      database: 'gt2',
      port: 5432,
      username: 'postgres',
      password: 'Coggel86',
      ssl: false,

      synchronize: true,
      logging: true,
      migrationsRun: false, // we run migrations programmatically
      // also no subscribers! use Nest DI and push to connection.subscribers
      entities: entities,
      migrations: migrations,
      cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/entity/migration',
      },
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const aws = configService.get<string>('AWS') === 'true';
        return {
          installSubscriptionHandlers: true,
          autoSchemaFile: aws ? '/tmp/schema.gql' : 'schema.gql',
          debug: true,
          context: ({ req }) => ({ req }),
          sortSchema: true,
        };
      },
    }),
    ModelModule,
  ],
  controllers: [AppController],
  providers: [AppService, MigrationService, ...serviceProviders, ...resolvers],
})
export class AppModule {
  constructor(private moduleRef: ModuleRef) {
    new ModuleReferenceService(moduleRef);
  }
}
