import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { migrations } from './migrations';

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

    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
