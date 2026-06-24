import { Global, Module } from '@nestjs/common';
import { CacheModule as NestJsCacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { env } from '@/config/env';

@Global()
@Module({
  imports: [
    NestJsCacheModule.registerAsync({
      useFactory: () => ({
        stores: [new KeyvRedis(`redis://${env.REDIS_HOST}:${env.REDIS_PORT}`)],
      }),
    }),
  ],
  providers: [],
  exports: [],
})
export class CacheModule {}
