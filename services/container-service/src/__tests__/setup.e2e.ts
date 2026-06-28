import { PinoLogger } from 'nestjs-pino';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../infrastructure/database/prisma/generated/client';
import { env } from '../config/env';

const logger = new PinoLogger({ renameContext: 'Setup E2E tests' });

const connectionString = env.DATABASE_URL;

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

beforeAll(async () => {
  if (env.NODE_ENV !== 'test') {
    throw new Error('Wrong test environment');
  }

  if (!env.DATABASE_URL.includes('test')) {
    throw new Error('Wrong test database');
  }

  logger.info('E2E database connected!');
  await prisma.$connect();
});

beforeEach(async () => {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE containers CASCADE`);
  logger.info('E2E database reset!');
});

afterAll(async () => {
  await prisma.$disconnect();
  logger.info('E2E database disconnected!');
});
