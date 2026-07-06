import { execSync } from 'node:child_process';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { KafkaContainer, StartedKafkaContainer } from '@testcontainers/kafka';
import { PrismaService } from '../infrastructure/database/prisma/prisma.service';
import { PinoLogger } from 'nestjs-pino';

const logger = new PinoLogger({ renameContext: 'Integration tests' });

let prisma: PrismaService;
let postgres: StartedPostgreSqlContainer;
let kafka: StartedKafkaContainer;

const setupKafka = async () => {
  kafka = await new KafkaContainer('confluentinc/cp-kafka:7.8.0')
    .withKraft()
    .start();

  process.env.KAFKA_BROKER = `${kafka.getHost()}:${kafka.getMappedPort(9093)}`;

  logger.info('Integration tests kafka connected!');
};

const setupPostgres = async () => {
  postgres = await new PostgreSqlContainer('postgres:18-alpine')
    .withExposedPorts(5432)
    .withDatabase('container_service_test_db')
    .withUsername('admin')
    .withPassword('admin')
    .start();

  const connectionString = postgres.getConnectionUri();
  process.env.DATABASE_URL = connectionString;

  execSync('pnpm prisma migrate deploy', {
    env: process.env,
    stdio: 'inherit',
  });

  prisma = new PrismaService();
  await prisma.$connect();

  logger.info('Integration tests database connected!');
};

beforeAll(async () => {
  await setupKafka();
  await setupPostgres();
});

beforeEach(async () => {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE containers CASCADE`);
  logger.info('Integration database reset!');
});

afterAll(async () => {
  await prisma.$disconnect();
  await kafka.stop();
  await postgres.stop();
  logger.info('Integration database disconnected!');
});
