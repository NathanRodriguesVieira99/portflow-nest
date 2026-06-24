import { Module } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { LoggerModule } from 'nestjs-pino';

import { env } from '../../../config/env';
import { trace } from '@opentelemetry/api';

const isDev = env.NODE_ENV === 'development';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      inject: [ClsService],

      useFactory: (cls: ClsService) => ({
        pinoHttp: {
          level: isDev ? 'debug' : 'info',

          ...(isDev && {
            formatters: { level: (label: string) => ({ level: label }) },
          }),

          customProps: () => {
            const span = trace.getActiveSpan();
            const spanContext = span?.spanContext();
            return {
              correlationId: cls.getId(),
              traceId: spanContext?.traceId,
              spanId: spanContext?.spanId,
              service: env.SERVICE_NAME ?? 'Container-Service',
            };
          },

          customSuccessMessage: (req, res) =>
            `${req.method} ${req.url} ${res.statusCode}`,

          customErrorMessage: (req, res, err) =>
            `${req.method} ${req.url} ${res.statusCode} - ${err.message}`,

          // Em dev, envia logs no console via pino-pretty
          transport: isDev
            ? {
                target: 'pino-pretty',
                options: {
                  singleLine: true,
                  colorize: true,
                  messageFormat: '[{correlationId}] {msg}',
                },
              }
            : // Em produção, envia para Loki diretamente via pino-loki
              {
                targets: [
                  { target: 'pino/file', options: { destination: 1 } },
                  {
                    target: 'pino-loki',
                    options: {
                      host: env.LOKI_URL ?? 'http://loki:3100',
                      labels: {
                        service: env.SERVICE_NAME ?? 'Container-Service',
                      },
                      propsToLabels: ['level', 'service'],
                    },
                  },
                ],
              },
        },
      }),
    }),
  ],
})
export class LogsModule {}
