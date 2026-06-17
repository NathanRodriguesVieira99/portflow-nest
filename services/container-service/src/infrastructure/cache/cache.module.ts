import { Global, Module } from '@nestjs/common';
import { CacheModule as NestJsCacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';

@Global()
@Module({
  imports: [
    NestJsCacheModule.registerAsync({
      useFactory: () => ({
        stores: [
          new KeyvRedis(
            `redis://${process.env.REDIS_HOST ?? 'localhost'}:${process.env.REFIS_PORT ?? 6379}`,
          ),
        ],
      }),
    }),
  ],
  providers: [],
  exports: [],
})
export class CacheModule {}
