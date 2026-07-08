import { AppError } from '../error';
import {
  badRequest,
  conflict,
  databaseError,
  forbidden,
  notFound,
  invalidCredentials,
  unauthorized,
  rateLimited,
  internalServerError,
} from '../exceptions/exceptions';

describe('Error factories', () => {
  describe('AppError', () => {
    it('should return an error with status code and message', () => {
      const error = AppError('BAD_REQUEST', 'Invalid request!');
      expect(error).toEqual({
        code: 'BAD_REQUEST',
        status: 400,
        message: 'Invalid request!',
      });
    });

    it('should return details when provided', () => {
      const details = { field: 'email' };
      const error = AppError('BAD_REQUEST', 'Invalid request!', details);
      expect(error).toEqual({
        code: 'BAD_REQUEST',
        status: 400,
        message: 'Invalid request!',
        details,
      });
    });

    it('should omit details when undefined', () => {
      const error = AppError('BAD_REQUEST', 'Invalid request!');
      expect(error).not.toHaveProperty('details');
    });
  });

  describe('Exceptions', () => {
    describe('badRequest()', () => {
      it('should return default message', () => {
        const exception = badRequest();
        expect(exception.message).toBe('Invalid request!');
        expect(exception.code).toBe('BAD_REQUEST');
      });
    });

    describe('conflict()', () => {
      it('should return default message', () => {
        const exception = conflict();
        expect(exception.message).toBe('Conflict!');
        expect(exception.code).toBe('CONFLICT');
      });
    });

    describe('internalServerError()', () => {
      it('should return default message', () => {
        const exception = internalServerError();
        expect(exception.message).toBe('Internal server error!');
        expect(exception.code).toBe('INTERNAL_SERVER_ERROR');
      });
    });

    describe('databaseError()', () => {
      it('should return default message', () => {
        const exception = databaseError();
        expect(exception.message).toBe('Database error!');
        expect(exception.code).toBe('DATABASE_ERROR');
      });
    });

    describe('forbidden()', () => {
      it('should return default message', () => {
        const exception = forbidden();
        expect(exception.message).toBe('Insufficient permissions!');
        expect(exception.code).toBe('FORBIDDEN');
      });
    });

    describe('notFound()', () => {
      it('should return default message', () => {
        const exception = notFound('Resource x');
        expect(exception.message).toBe('Resource x not found!');
        expect(exception.code).toBe('RESOURCE_NOT_FOUND');
      });
    });

    describe('invalidCredentials()', () => {
      it('should return default message', () => {
        const exception = invalidCredentials();
        expect(exception.message).toBe('Invalid credential!');
        expect(exception.code).toBe('INVALID_CREDENTIALS');
      });
    });

    describe('unauthorized()', () => {
      it('should return default message', () => {
        const exception = unauthorized();
        expect(exception.message).toBe('Unauthorized!');
        expect(exception.code).toBe('UNAUTHORIZED');
      });
    });

    describe('rateLimited()', () => {
      it('should return default message', () => {
        const exception = rateLimited();
        expect(exception.message).toBe('Too many requests');
        expect(exception.code).toBe('RATE_LIMITED');
      });
    });

    describe('Custom message', () => {
      it('should return custom message', () => {
        const exception = unauthorized('User not authorized!');
        expect(exception.message).toBe('User not authorized!');
        expect(exception.code).toBe('UNAUTHORIZED');
      });
    });
  });
});
