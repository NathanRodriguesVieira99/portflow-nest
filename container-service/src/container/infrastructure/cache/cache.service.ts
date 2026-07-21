import { Inject, Injectable, Logger, type OnModuleInit } from '@nestjs/common';
import { CACHE_MANAGER, type Cache } from '@nestjs/cache-manager';

export interface ICacheService {
  get<T>(key: string): Promise<T | undefined>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  del(key: string): Promise<void>;
  clear(): Promise<void>;
}

@Injectable()
export class CacheService implements ICacheService, OnModuleInit {
  private logger = new Logger(CacheService.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  onModuleInit() {
    this.logger.debug('Redis Started!');
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
