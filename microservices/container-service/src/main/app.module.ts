import KeyvRedis from '@keyv/redis';
import { trace } from '@opentelemetry/api';
import { nanoid } from 'nanoid';
import { LoggerModule } from 'nestjs-pino';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ClsModule, ClsService } from 'nestjs-cls';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheService } from '../infra/cache/cache.service';
import { env } from '../config/env';
import { isDev, SERVICE_NAME } from '../domain/constants/constants';
import { PrismaService } from '../infra/persistence/database/prisma/prisma.service';
import { ContainerModule } from '@/infra/modules/container.module';

@Module({
  imports: [
    ContainerModule,
    CacheModule.registerAsync({
      useFactory: () => ({
        stores: [new KeyvRedis(`redis://${env.REDIS_HOST}:${env.REDIS_PORT}`)],
      }),
    }),

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
  providers: [CacheService],
  exports: [CacheService],
})
export class AppModule {}
