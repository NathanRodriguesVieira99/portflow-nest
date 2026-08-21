import {
  disconnectMongoDB,
  resetMongoDBDatabase,
  setupMongoDB,
} from 'test/helpers';

jest.setTimeout(60_000); // aumenta o limite de timeout do Jest de 30s para 60s

beforeAll(async () => {
  await setupMongoDB();
});

beforeEach(async () => {
  await resetMongoDBDatabase();
});

afterAll(async () => {
  await disconnectMongoDB();
});
