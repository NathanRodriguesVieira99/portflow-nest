import { execSync } from 'node:child_process';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { PrismaClient } from '@Infra/persistence/database/prisma/generated/client';

export let prisma: PrismaClient;
export let postgres: StartedPostgreSqlContainer;

export const setupPrismaAndPostgres = async () => {
  postgres = await new PostgreSqlContainer('postgres:18-alpine')
    .withExposedPorts(5432)
    .withDatabase('container_service_test_db')
    .withUsername('admin')
    .withPassword('admin')
    .start();

  process.env.DATABASE_URL = postgres.getConnectionUri();

  const adapter = new PrismaPg({
    connectionString: postgres.getConnectionUri(),
  });

  prisma = new PrismaClient({ adapter });
  await prisma.$connect();
};

export const resetDatabase = () => {
  execSync('pnpm prisma migrate reset -f', {
    env: process.env,
  });
};

export const disconnectPrismaAndPostgres = async () => {
  if (prisma) await prisma.$disconnect();
  if (postgres) await postgres.stop();
};
