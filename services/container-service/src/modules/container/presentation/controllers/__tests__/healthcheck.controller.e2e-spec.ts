import { Test, TestingModule } from '@nestjs/testing';

import request from 'supertest';

import { AppModule } from '../../../../../app.module';

import type { INestApplication } from '@nestjs/common';

describe('E2E - Healthcheck', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('[GET] /api/v1/health', () => {
    it('should return ok', async () => {
      const health = await request(app.getHttpServer()).get(`/health`);

      expect(health.status).toBe(200);
      expect(health.body).toEqual({
        ok: true,
        status: 200,
        content: 'Service: Container',
        timestamp: expect.any(String),
      });
    });
  });
});
