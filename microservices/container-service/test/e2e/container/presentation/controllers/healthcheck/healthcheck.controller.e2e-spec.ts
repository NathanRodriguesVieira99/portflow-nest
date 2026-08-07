import request from 'supertest';
import { app } from '../../../../../helpers';

describe('Healthcheck', () => {
  describe('GET /health', () => {
    it('should return 200', async () => {
      const health = await request(app.getHttpServer()).get(`/health`);
      expect(health.status).toBe(200);
      expect(health.body).toEqual({
        ok: true,
        response: {
          code: 'OK',
          status: 200,
          content: 'Container service UP!',
        },
        timestamp: expect.any(String),
      });
    });
  });
});
