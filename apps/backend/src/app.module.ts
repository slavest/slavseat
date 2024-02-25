import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { ConfigurationModule } from './libs/config/config.module';
import { DatabaseModule } from './libs/database/database.module';
import { HttpLoggerMiddleware } from './libs/logging/http-logger.middleware';
import { FacilityModule } from './modules/facility/facility.module';
import { FloorModule } from './modules/floor/floor.module';
import { ReserveModule } from './modules/reserve/reserve.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    ReserveModule,
    FloorModule,
    FacilityModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
