import { Test } from '@nestjs/testing';
import { PinoLogger } from 'nestjs-pino';
import { AppModule } from '../../src/app.module';

import type { INestApplication } from '@nestjs/common';

const logger = new PinoLogger({ renameContext: 'Setup NestJs App' });

export let app: INestApplication;
export const setupTestingModule = async () => {
  const module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = module.createNestApplication();

  await app.init();
  logger.info('NestJs testing module started!');
};

export const closeTestingModule = async () => {
  await app.close();
  logger.info('NestJs testing module closed!');
};
