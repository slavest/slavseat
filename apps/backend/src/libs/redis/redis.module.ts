import { RedisModule as NestRedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigurationModule } from '../config/config.module';

@Module({
  imports: [
    NestRedisModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        config: {
          host: configService.getOrThrow('REDIS_HOST'),
          port: configService.getOrThrow('REDIS_PORT'),
        },
      }),
    }),
  ],
})
export class RedisModule {}
