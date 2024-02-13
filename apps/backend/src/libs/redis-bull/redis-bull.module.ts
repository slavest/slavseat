import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigurationModule } from '../config/config.module';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.getOrThrow('REDIS_HOST'),
          port: configService.getOrThrow('REDIS_PORT'),
          db: configService.getOrThrow('REDIS_DB'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class RedisBullModule {}
