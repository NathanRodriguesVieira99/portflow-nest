import { Error } from '../error';

export const unauthorized = (message = 'Não autorizado!') =>
  Error('UNAUTHORIZED', message);

export const invalidCredentials = (message = 'Credenciais inválidas!') =>
  Error('INVALID_CREDENTIALS', message);

export const badRequest = (message = 'Requisição inválida!') =>
  Error('BAD_REQUEST', message);

export const forbidden = (message = 'Permissão insuficiente!') =>
  Error('FORBIDDEN', message);

export const conflict = (message = 'Conflito!') => Error('CONFLICT', message);

export const notFound = (resource: string) =>
  Error('RESOURCE_NOT_FOUND', `${resource} não encontrado!`);

export const databaseError = (message = 'Database error!') =>
  Error('DATABASE_ERROR', message);

export const rateLimited = (message = 'Muitas requisições'): Error =>
  Error('RATE_LIMITED', message);
