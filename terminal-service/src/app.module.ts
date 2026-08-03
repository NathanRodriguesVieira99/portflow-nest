import { Module } from '@nestjs/common';
import { TerminalModule } from './terminal/terminal.module';
import { PrometheusModule } from '@Infra/observability/prometheus.module';
import { ClsModule } from '@Infra/observability/cls.module';
import { LoggerModule } from '@Infra/logger/logger.module';

@Module({
  imports: [TerminalModule, PrometheusModule, ClsModule, LoggerModule],
})
export class AppModule {}
