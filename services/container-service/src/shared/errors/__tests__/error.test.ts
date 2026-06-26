import { describe, expect, it } from 'vitest';

import { Error } from '../error';
import {
  badRequest,
  conflict,
  databaseError,
  forbidden,
  notFound,
  invalidCredentials,
  unauthorized,
  rateLimited,
} from '../exceptions/exceptions';

describe('Error factories', () => {
  describe('Error', () => {
    it('should return an error with status code and message', () => {
      const error = Error('BAD_REQUEST', 'Requisição inválida!');
      expect(error).toEqual({
        code: 'BAD_REQUEST',
        message: 'Requisição inválida!',
      });
    });

    it('should return details when provided', () => {
      const details = { field: 'email' };
      const error = Error('BAD_REQUEST', 'Requisição inválida!', details);
      expect(error).toEqual({
        code: 'BAD_REQUEST',
        message: 'Requisição inválida!',
        details,
      });
    });

    it('should omit details when undefined', () => {
      const error = Error('BAD_REQUEST', 'Requisição inválida!');
      expect(error).not.toHaveProperty('details');
    });
  });

  describe('Exceptions', () => {
    describe('badRequest()', () => {
      it('should return default message', () => {
        const exception = badRequest();
        expect(exception.message).toBe('Requisição inválida!');
        expect(exception.code).toBe('BAD_REQUEST');
      });
    });

    describe('conflict()', () => {
      it('should return default message', () => {
        const exception = conflict();
        expect(exception.message).toBe('Conflito!');
        expect(exception.code).toBe('CONFLICT');
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
        expect(exception.message).toBe('Permissão insuficiente!');
        expect(exception.code).toBe('FORBIDDEN');
      });
    });

    describe('notFound()', () => {
      it('should return default message', () => {
        const exception = notFound('Recurso x');
        expect(exception.message).toBe('Recurso x não encontrado!');
        expect(exception.code).toBe('RESOURCE_NOT_FOUND');
      });
    });

    describe('invalidCredentials()', () => {
      it('should return default message', () => {
        const exception = invalidCredentials();
        expect(exception.message).toBe('Credenciais inválidas!');
        expect(exception.code).toBe('INVALID_CREDENTIALS');
      });
    });

    describe('unauthorized()', () => {
      it('should return default message', () => {
        const exception = unauthorized();
        expect(exception.message).toBe('Não autorizado!');
        expect(exception.code).toBe('UNAUTHORIZED');
      });
    });

    describe('rateLimited()', () => {
      it('should return default message', () => {
        const exception = rateLimited();
        expect(exception.message).toBe('Muitas requisições');
        expect(exception.code).toBe('RATE_LIMITED');
      });
    });

    describe('Custom message', () => {
      it('should return custom message', () => {
        const exception = unauthorized('Usuário não autorizado!');
        expect(exception.message).toBe('Usuário não autorizado!');
        expect(exception.code).toBe('UNAUTHORIZED');
      });
    });
  });
});
