import {
  badRequest,
  conflict,
  databaseError,
  forbidden,
  internalServerError,
  invalidCredentials,
  notFound,
  rateLimited,
  serviceUnavailable,
  unauthorized,
  validationError,
} from '@/application/exceptions/exceptions';
import { Http } from '@/domain/types/http';

describe('Exceptions', () => {
  describe('badRequest()', () => {
    it('should return default message', () => {
      const exception = badRequest();
      expect(exception.code).toBe(Http.Codes.BAD_REQUEST);
      expect(exception.status).toBe('BAD_REQUEST');
      expect(exception.message).toBe('Invalid request!');
    });
  });
  describe('conflict()', () => {
    it('should return default message', () => {
      const exception = conflict();
      expect(exception.code).toBe(Http.Codes.CONFLICT);
      expect(exception.status).toBe('CONFLICT');
      expect(exception.message).toBe('Conflict!');
    });
  });
  describe('internalServerError()', () => {
    it('should return default message', () => {
      const exception = internalServerError();
      expect(exception.code).toBe(Http.Codes.INTERNAL_SERVER_ERROR);
      expect(exception.status).toBe('INTERNAL_SERVER_ERROR');
      expect(exception.message).toBe('Internal server error!');
    });
  });
  describe('databaseError()', () => {
    it('should return default message', () => {
      const exception = databaseError();
      expect(exception.code).toBe(Http.Codes.INTERNAL_SERVER_ERROR);
      expect(exception.status).toBe('DATABASE_ERROR');
      expect(exception.message).toBe('Database error!');
    });
  });
  describe('forbidden()', () => {
    it('should return default message', () => {
      const exception = forbidden();
      expect(exception.code).toBe(Http.Codes.FORBIDDEN);
      expect(exception.status).toBe('FORBIDDEN');
      expect(exception.message).toBe('Insufficient permissions!');
    });
  });
  describe('notFound()', () => {
    it('should return default message', () => {
      const exception = notFound('Resource x');
      expect(exception.code).toBe(Http.Codes.NOT_FOUND);
      expect(exception.status).toBe('RESOURCE_NOT_FOUND');
      expect(exception.message).toBe('Resource x not found!');
    });
  });
  describe('invalidCredentials()', () => {
    it('should return default message', () => {
      const exception = invalidCredentials();
      expect(exception.code).toBe(Http.Codes.UNAUTHORIZED);
      expect(exception.status).toBe('INVALID_CREDENTIALS');
      expect(exception.message).toBe('Invalid credential!');
    });
  });
  describe('unauthorized()', () => {
    it('should return default message', () => {
      const exception = unauthorized();
      expect(exception.code).toBe(Http.Codes.UNAUTHORIZED);
      expect(exception.status).toBe('UNAUTHORIZED');
      expect(exception.message).toBe('Unauthorized!');
    });
  });
  describe('validationError()', () => {
    it('should return default message', () => {
      const exception = validationError();
      expect(exception.code).toBe(Http.Codes.UNPROCESSABLE_ENTITY);
      expect(exception.status).toBe('VALIDATION_ERROR');
      expect(exception.message).toBe('Validation error!');
    });
  });
  describe('rateLimited()', () => {
    it('should return default message', () => {
      const exception = rateLimited();
      expect(exception.code).toBe(Http.Codes.RATE_LIMITED);
      expect(exception.status).toBe('RATE_LIMITED');
      expect(exception.message).toBe('Too many requests!');
    });
  });
  describe('serviceUnavailable()', () => {
    it('should return default message', () => {
      const exception = serviceUnavailable();
      expect(exception.code).toBe(Http.Codes.SERVICE_UNAVAILABLE);
      expect(exception.status).toBe('SERVICE_UNAVAILABLE');
      expect(exception.message).toBe('Service unavailable!');
    });
  });
  describe('Custom message', () => {
    it('should return custom message', () => {
      const exception = unauthorized('User not authorized!');
      expect(exception.code).toBe(Http.Codes.UNAUTHORIZED);
      expect(exception.status).toBe('UNAUTHORIZED');
      expect(exception.message).toBe('User not authorized!');
    });
  });
});