import { execSync } from 'node:child_process';
import { PinoLogger } from 'nestjs-pino';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../infrastructure/database/prisma/generated/client';

const logger = new PinoLogger({ renameContext: 'Setup PostgreSQL' });

export let prisma: PrismaClient;
export let postgres: StartedPostgreSqlContainer;

export const setupPrismaAndPostgres = async () => {
  postgres = await new PostgreSqlContainer('postgres:18-alpine')
    .withExposedPorts(5432)
    .withDatabase('container_service_test_db')
    .withUsername('admin')
    .withPassword('admin')
    .start();

  logger.info('PostgreSQL connected!');

  process.env.DATABASE_URL = postgres.getConnectionUri();

  const connectionString = postgres.getConnectionUri();

  const adapter = new PrismaPg({ connectionString });

  prisma = new PrismaClient({ adapter });

  await prisma.$connect();

  logger.info('Prisma connected!');
};

export const resetDatabase = () => {
  execSync('pnpm prisma migrate reset --force', {
    env: process.env,
  });

  execSync('pnpm prisma migrate deploy', {
    env: process.env,
  });

  logger.info('Database reset!');
};

export const disconnectPrismaAndPostgres = async () => {
  await prisma.$disconnect();
  logger.info('Prisma disconnected!');

  await postgres.stop();
  logger.info('PostgreSQL disconnected!');
};
