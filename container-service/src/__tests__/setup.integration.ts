import { execSync } from 'node:child_process';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { PinoLogger } from 'nestjs-pino';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { KafkaContainer, StartedKafkaContainer } from '@testcontainers/kafka';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../infrastructure/database/prisma/generated/client';

import type { INestApplication } from '@nestjs/common';

const logger = new PinoLogger({ renameContext: 'Integration tests' });

let app: INestApplication;
let prisma: PrismaClient;
let postgres: StartedPostgreSqlContainer;
let kafka: StartedKafkaContainer;

const setupTestingModule = async () => {
  const module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = module.createNestApplication();

  await app.init();
  logger.info('NestJs testing module started!');
};

const setupKafka = async () => {
  kafka = await new KafkaContainer('confluentinc/cp-kafka:7.8.0')
    .withKraft()
    .start();

  process.env.KAFKA_BROKER = `${kafka.getHost()}:${kafka.getMappedPort(9093)}`;

  logger.info('Kafka connected!');
};

const setupPostgres = async () => {
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

beforeAll(async () => {
  await setupTestingModule();
  await setupKafka();
  await setupPostgres();
});

beforeEach(async () => {
  execSync('pnpm prisma migrate reset --force', {
    env: process.env,
  });

  execSync('pnpm prisma migrate deploy', {
    env: process.env,
  });

  logger.info('Database reset!');
});

afterAll(async () => {
  await prisma.$disconnect();
  logger.info('Prisma disconnected!');
  await kafka.stop();
  logger.info('Kafka disconnected!');
  await postgres.stop();
  logger.info('PostgreSQL disconnected!');
  await app.close();
  logger.info('NestJs testing module closed!');
});
