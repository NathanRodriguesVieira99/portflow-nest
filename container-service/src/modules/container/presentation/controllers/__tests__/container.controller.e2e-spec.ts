import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../../../app.module';

import type { INestApplication } from '@nestjs/common';

describe('ContainerController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  afterAll(async () => await app.close());

  describe('[E2E] POST /containers/arrivals', () => {
    it.todo('should ', () => {});
  });

  describe('[E2E] GET /containers', () => {
    it.todo('should ', () => {});
  });

  describe('[E2E] GET /containers/status', () => {
    it.todo('should ', () => {});
  });

  describe('[E2E] GET /containers/:containerId', () => {
    it.todo('should ', () => {});
  });

  describe('[E2E] PUT /containers/:containerId/update-status', () => {
    it.todo('should ', () => {});
  });
});
