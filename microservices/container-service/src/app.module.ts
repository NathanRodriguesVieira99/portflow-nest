import KeyvRedis from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { trace } from '@opentelemetry/api';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { nanoid } from 'nanoid';
import { ClsModule, ClsService } from 'nestjs-cls';
import { LoggerModule } from 'nestjs-pino';
import { RedisCache } from '@/external/cache/cache-redis';
import { env } from './external/env';
import { SERVICE_NAME } from '@/external/observability/tracing/tracing';
import { ContainerModule } from './external/modules/container.module';
import { Http } from './domain/types/http';

const isDev = env.NODE_ENV === 'development';

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
            if (err || res.statusCode >= Http.Codes.INTERNAL_SERVER_ERROR)
              return 'error'; /* 5xx = ERROR */
            if (res.statusCode >= Http.Codes.BAD_REQUEST)
              return 'warn'; /* 4xx = WARN */
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
  providers: [RedisCache],
  exports: [RedisCache],
})
export class AppModule {}
