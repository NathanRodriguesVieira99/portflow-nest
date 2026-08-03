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

beforeEach(() => {
  resetDatabase();
});

afterAll(async () => {
  await disconnectPrismaAndPostgres();
  await disconnectKafka();
});
