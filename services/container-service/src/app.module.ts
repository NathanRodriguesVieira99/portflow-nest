import { Module } from '@nestjs/common';

import { CacheModule } from './infrastructure/cache/cache.module';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { LogsModule } from './infrastructure/observability/logs/logs.module';
import { HttpModule } from './infrastructure/http/http.module';
import { KafkaModule } from './infrastructure/kafka/kafka.module';
import { PrometheusModule } from './infrastructure/observability/prometheus/prometheus.module';
import { ClsModule } from './infrastructure/observability/cls/cls.module';
import { ContainerModule } from './modules/container/container.module';

@Module({
  imports: [
    /* Infra */
    ClsModule,
    LogsModule,
    PrometheusModule,
    HttpModule,
    PrismaModule,
    CacheModule,
    KafkaModule,

    /* Business Logic */
    ContainerModule,
  ],
})
export class AppModule {}
