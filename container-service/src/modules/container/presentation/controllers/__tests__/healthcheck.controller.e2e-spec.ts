import request from 'supertest';
import { app } from '../../../../../__tests__/helpers/setup-app';

describe('E2E - Healthcheck', () => {
  describe('[E2E] GET /health', () => {
    it('should return 200', async () => {
      const health = await request(app.getHttpServer()).get(`/health`);

      expect(health.status).toBe(200);
      expect(health.body).toEqual({
        ok: true,
        data: {
          code: 'OK',
          status: 200,
          content: 'Container service UP!',
        },
        timestamp: expect.any(String),
      });
    });
  });
});
