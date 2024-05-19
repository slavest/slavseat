import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { ConfigurationModule } from './libs/config/config.module';
import { DatabaseModule } from './libs/database/database.module';
import { HttpLoggerMiddleware } from './libs/logging/http-logger.middleware';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthUserMiddleware } from './modules/auth/middleware/auth-user.middleware';
import { FacilityModule } from './modules/facility/facility.module';
import { FloorModule } from './modules/floor/floor.module';
import { JwtModule } from './modules/jwt/jwt.module';
import { ReserveModule } from './modules/reserve/reserve.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { UserModule } from './modules/user/user.module';
import { CompanyModule } from './modules/company/company.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    ReserveModule,
    FloorModule,
    FacilityModule,
    AuthModule,
    UserModule,
    JwtModule,
    AdminModule,
    StatisticsModule,
    CompanyModule,
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
    consumer.apply(HttpLoggerMiddleware).forRoutes('/');
    consumer.apply(AuthUserMiddleware).forRoutes('*');
  }
}
