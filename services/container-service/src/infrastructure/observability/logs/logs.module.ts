import { Module } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { LoggerModule } from 'nestjs-pino';

import { env } from '../../../config/env';
import { trace } from '@opentelemetry/api';
import { SERVICE_NAME } from '../../../constants/constants';

export const isDev = env.NODE_ENV === 'development';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      inject: [ClsService],

      useFactory: (cls: ClsService) => ({
        pinoHttp: {
          level: isDev ? 'debug' : 'info',

          formatters: { level: (label: string) => ({ level: label }) },

          customProps: () => {
            const spanContext = trace.getActiveSpan()?.spanContext();
            return {
              correlationId: cls.getId(),
              traceId: spanContext?.traceId,
              spanId: spanContext?.spanId,
              ...(isDev && { service: env.SERVICE_NAME ?? SERVICE_NAME }),
            };
          },

          customSuccessMessage: (req, res, responseTime) =>
            `${req.method} ${req.url} ${res.statusCode} +${responseTime}ms`,

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
            : undefined,
        },
      }),
    }),
  ],
})
export class LogsModule {}
