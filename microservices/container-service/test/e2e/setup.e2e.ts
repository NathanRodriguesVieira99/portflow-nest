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
  await setupKafka();
  await setupPrismaAndPostgres();
  await setupTestingModule();
});

beforeEach(() => {
  resetDatabase();
});

afterAll(async () => {
  await disconnectPrismaAndPostgres();
  await disconnectKafka();
  await closeTestingModule();
});
