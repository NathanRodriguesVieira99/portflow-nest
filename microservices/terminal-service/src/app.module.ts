import { Module } from '@nestjs/common';
import { TerminalModule } from './terminal/terminal.module';
import { PrometheusModule } from '@Infra/observability/prometheus.module';
import { ClsModule } from '@Infra/observability/cls.module';
import { LoggerModule } from '@Infra/logger/logger.module';
import { MessagingModule } from '@Infra/messaging/messaging.module';
import { MongooseModule } from '@Infra/persistence/database/mongodb/mongoose.module';

@Module({
  imports: [
    TerminalModule,
    PrometheusModule,
    ClsModule,
    LoggerModule,
    MessagingModule,
    MongooseModule,
  ],
})
export class AppModule {}
