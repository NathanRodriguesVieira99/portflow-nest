import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger, type OnModuleInit } from '@nestjs/common';
import type { CacheContract } from '@/application/ports/cache/cache';

@Injectable()
export class RedisCache implements CacheContract, OnModuleInit {
  private logger = new Logger(RedisCache.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cache: CacheContract) {}

  onModuleInit() {
    this.logger.log('Redis Started!');
  }

  async get<T>(key: string): Promise<T | undefined> {
    const start = Date.now();

    const cachedValue = await this.cache.get<T>(key);

    const duration = Date.now() - start;

    const hit = cachedValue !== undefined && cachedValue !== null;

    this.logger.debug({
      key,
      type: 'cache',
      status: hit ? 'HIT' : 'MISS',
      duration,
    });

    return cachedValue;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.cache.set(key, value, ttl);
    this.logger.debug(`CACHE SET key=${key} ttl=${ttl}`);
  }

  async del(key: string): Promise<void> {
    await this.cache.del(key);
    this.logger.debug(`CACHE DEL key=${key}`);
  }

  async clear(): Promise<void> {
    await this.cache.clear();
  }
}
