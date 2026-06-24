import { Module } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { LoggerModule } from 'nestjs-pino';

import { env } from '../../../config/env';

const isDev = env.NODE_ENV === 'development';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      inject: [ClsService],

      useFactory: (cls: ClsService) => ({
        pinoHttp: {
          level: isDev ? 'debug' : 'info',

          transport: isDev
            ? {
                target: 'pino-pretty',
                options: {
                  singleLine: true,
                  colorize: true,
                },
              }
            : undefined,

          customProps: () => {
            return {
              /* Pino Exibe o correlation id nos logs */
              correlationId: cls.getId(),
            };
          },
        },
      }),
    }),
  ],
})
export class LogsModule {}
