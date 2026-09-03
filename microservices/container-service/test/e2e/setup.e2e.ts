import { closeTestingModule, setupTestingModule } from '../helpers';

beforeAll(async () => {
  await setupTestingModule();
});

afterAll(async () => {
  await closeTestingModule();
});
