import { Module } from '@nestjs/common';
import { CacheModule } from './infrastructure/cache/cache.module';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { LogsModule } from './infrastructure/logs/logs.module';

@Module({
  providers: [],
  exports: [],
  imports: [PrismaModule, CacheModule, LogsModule],
})
export class AppModule {}
