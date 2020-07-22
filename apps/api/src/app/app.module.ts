import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// typeOrm + list of entities from THIS application + try to enhance e.g. Organization

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
