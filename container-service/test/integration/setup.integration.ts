import {
  closeTestingModule,
  disconnectKafka,
  disconnectPrismaAndPostgres,
  resetDatabase,
  setupKafka,
  setupPrismaAndPostgres,
  setupTestingModule,
} from '../helpers';

beforeAll(async () => {
  await setupTestingModule();
  await setupKafka();
  await setupPrismaAndPostgres();
});

beforeEach(() => {
  resetDatabase();
});

afterAll(async () => {
  await disconnectPrismaAndPostgres();
  await disconnectKafka();
  await closeTestingModule();
});
