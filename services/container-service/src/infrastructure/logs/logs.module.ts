import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { env } from '../../config/env';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: env.NODE_ENV === 'development' ? 'debug' : 'info',
        transport:
          env.NODE_ENV === 'development'
            ? {
                target: 'pino-pretty',
                options: {
                  singleLine: true,
                  colorize: true,
                  // translateTime: 'SYS:standard',
                },
              }
            : undefined,
      },
    }),
  ],
})
export class LogsModule {}
