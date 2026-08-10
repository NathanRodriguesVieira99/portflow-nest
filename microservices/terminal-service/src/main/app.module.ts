import { trace } from '@opentelemetry/api';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { Module } from '@nestjs/common';
import { ClsModule, ClsService } from 'nestjs-cls';
import { LoggerModule } from 'nestjs-pino';
import { nanoid } from 'nanoid';
import { TerminalModule } from '../infra/modules/terminal.module';
import { MessagingModule } from '@/infra/messaging/messaging.module';
import { env } from '@/config/env';
import { isDev, SERVICE_NAME } from '@/domain/constants/constants';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TerminalModule,
    MessagingModule,
    MongooseModule.forRoot(env.MONGODB_URI, {}),
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
      },
    }),

    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) => {
          const header = req.headers['x-correlation-id'];
          return typeof header === 'string' ? header : nanoid();
        },
      },
    }),

    LoggerModule.forRootAsync({
      inject: [ClsService],

      useFactory: (cls: ClsService) => ({
        pinoHttp: {
          level: isDev ? 'debug' : 'info',

          formatters: { level: (label: string) => ({ level: label }) },

          customProps: () => {
            const correlationId = cls.getId();
            const spanContext = trace.getActiveSpan()?.spanContext();
            const traceId = spanContext?.traceId;
            const spanId = spanContext?.spanId;

            return {
              correlationId,
              traceId,
              spanId,
              ...(isDev && { service: env.SERVICE_NAME ?? SERVICE_NAME }),
            };
          },

          customLogLevel: (_req, res, err) => {
            if (err || res.statusCode >= 500) return 'error'; /* 5xx = ERROR */
            if (res.statusCode >= 400) return 'warn'; /* 4xx = WARN */
            return 'info'; /* 2xx = INFO */
          },

          customSuccessMessage: (req, res, responseTime) =>
            `${req.method} ${req.url} ${res.statusCode} +${responseTime}ms`,

          customErrorMessage: (req, res, err) =>
            `${req.method} ${req.url} ${res.statusCode} - ${err.message}`,

          transport: isDev
            ? {
                target: 'pino-pretty',
                options: {
                  singleLine: true,
                  colorize: true,
                  messageFormat: '[{correlationId}] {msg}',
                },
              }
            : undefined,
        },
      }),
    }),
  ],
})
export class AppModule {}
