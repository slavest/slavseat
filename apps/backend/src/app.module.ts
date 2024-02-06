import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './libs/config/config.module';
import { DatabaseModule } from './libs/database/database.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
