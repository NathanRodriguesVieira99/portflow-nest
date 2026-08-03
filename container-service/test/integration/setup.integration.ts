import {
  disconnectKafka,
  disconnectPrismaAndPostgres,
  resetDatabase,
  setupKafka,
  setupPrismaAndPostgres,
} from '../helpers';

beforeAll(async () => {
  await setupKafka();
  await setupPrismaAndPostgres();
});

beforeEach(async () => {
  await resetDatabase();
});

afterAll(async () => {
  await disconnectPrismaAndPostgres();
  await disconnectKafka();
});
