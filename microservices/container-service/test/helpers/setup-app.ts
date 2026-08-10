import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/main/app.module';

import type { INestApplication } from '@nestjs/common';

export let app: INestApplication;

export const setupTestingModule = async () => {
  const module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = module.createNestApplication();

  await app.init();
};

export const closeTestingModule = async () => {
  await app.close();
};
