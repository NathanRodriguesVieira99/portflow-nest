import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../infrastructure/database/prisma/generated/client';

import { env } from '../config/env';

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

  await prisma.$connect();
});

beforeEach(async () => {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE containers CASCADE`);
});

afterAll(async () => {
  await prisma.$disconnect();
});
