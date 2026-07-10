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
  validationError,
} from '../../../../src/shared/exceptions';

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

  describe('validationError()', () => {
    it('should return default message', () => {
      const exception = validationError();
      expect(exception.message).toBe('Validation error!');
      expect(exception.code).toBe('VALIDATION_ERROR');
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
