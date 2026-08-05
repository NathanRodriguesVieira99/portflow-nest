import { Global, Module } from '@nestjs/common';
import KeyvRedis from '@keyv/redis';
import { CacheModule as NestJsCacheModule } from '@nestjs/cache-manager';
import { env } from '../../../shared/env';
import { CacheService } from './cache.service';

@Global()
@Module({
  imports: [
    NestJsCacheModule.registerAsync({
      useFactory: () => ({
        stores: [new KeyvRedis(`redis://${env.REDIS_HOST}:${env.REDIS_PORT}`)],
      }),
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
