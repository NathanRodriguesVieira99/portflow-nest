import { Module } from '@nestjs/common';
import { TerminalModule } from './terminal/terminal.module';
import { PrometheusModule } from '@Infra/observability/prometheus.module';
import { ClsModule } from '@Infra/observability/cls.module';
import { LoggerModule } from '@Infra/logger/logger.module';
import { MessagingModule } from './terminal/infrastructure/messaging/messaging.module';

@Module({
  imports: [
    TerminalModule,
    PrometheusModule,
    ClsModule,
    LoggerModule,
    MessagingModule,
  ],
})
export class AppModule {}
