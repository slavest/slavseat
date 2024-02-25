import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import RedisMemoryServer from 'redis-memory-server';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: async () => {
        const redisServer = new RedisMemoryServer();

        return {
          config: {
            host: await redisServer.getHost(),
            port: await redisServer.getPort(),
          },
        };
      },
    }),
  ],
})
export class TestRedisModule {}
