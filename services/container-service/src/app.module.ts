import { Module } from '@nestjs/common';
import { CacheModule } from './infrastructure/cache/cache.module';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { LogsModule } from './infrastructure/logs/logs.module';
import { HttpModule } from './infrastructure/http/http.module';

@Module({
  providers: [],
  exports: [],
  imports: [CacheModule, PrismaModule, LogsModule, HttpModule],
})
export class AppModule {}
