import {
  Injectable,
  Logger,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, type Prisma } from './generated/client';
import { env } from '../../../config/env';

const connectionString = env.DATABASE_URL;

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private logger = new Logger(PrismaService.name);

  constructor() {
    const adapter = new PrismaPg({ connectionString });

    super({
      adapter,
      log:
        process.env.NODE_ENV === 'development'
          ? [
              { emit: 'event', level: 'query' },
              { emit: 'stdout', level: 'info' },
              { emit: 'event', level: 'error' },
              { emit: 'event', level: 'warn' },
            ]
          : [{ emit: 'event', level: 'error' }],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Database connected!');

      this.$on('query' as never, (e: Prisma.QueryEvent) => {
        this.logger.debug({
          QUERY: e.query,
          DURATION: `${e.duration.toFixed(2)}ms`,
        });
      });

      this.$on('error' as never, (e: Prisma.LogEvent) => {
        this.logger.error(
          `Prisma Error: ${e.message} | Timestamp: ${e.timestamp}`,
        );
      });

      this.$on('warn' as never, (e: Prisma.LogEvent) => {
        this.logger.warn(
          `Prisma Warning: ${e.message} | Timestamp: ${e.timestamp}ms`,
        );
      });
    } catch (err) {
      this.logger.error(`Database connection failed ${err}`);
      throw err;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.warn('Database disconnected!');
  }
}
