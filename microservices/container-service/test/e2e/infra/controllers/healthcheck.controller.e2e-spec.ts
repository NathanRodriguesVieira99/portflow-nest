import request from 'supertest';
import { app } from '../../../helpers';
import { Http } from '@/domain/types/http';

describe('Healthcheck', () => {
  describe('GET /health', () => {
    it('should return 200', async () => {
      const health = await request(app.getHttpServer()).get(`/health`);
      expect(health.status).toBe(Http.Codes.OK);
      expect(health.body).toEqual({
        ok: true,
        response: {
          code: Http.Codes.OK,
          status: 'OK',
          content: 'Container service UP!',
        },
        timestamp: expect.any(String),
      });
    });
  });
});
