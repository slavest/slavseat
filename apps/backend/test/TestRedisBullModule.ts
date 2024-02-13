import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import RedisMemoryServer from 'redis-memory-server';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: async () => {
        const redisServer = new RedisMemoryServer();

        return {
          redis: {
            host: await redisServer.getHost(),
            port: await redisServer.getPort(),
            db: 0,
          },
        };
      },
    }),
  ],
})
export class TestRedisBullModule {}
