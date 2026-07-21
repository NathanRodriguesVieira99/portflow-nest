import { Module } from '@nestjs/common';
import { CacheModule } from '@Infra/cache/cache.module';
import { LoggerModule } from '@Infra/logger/logger.module';
import { PrometheusModule } from '@Infra/observability/prometheus.module';
import { ClsModule } from '@Infra/observability/cls.module';
import { ContainerModule } from './container/container.module';
import { PrismaModule } from '@Infra/persistence/database/prisma/prisma.module';
import { KafkaModule } from '@Infra/messaging/kafka.module';

@Module({
  imports: [
    ClsModule,
    LoggerModule,
    PrometheusModule,
    PrismaModule,
    CacheModule,
    KafkaModule,
    ContainerModule,
  ],
})
export class AppModule {}
