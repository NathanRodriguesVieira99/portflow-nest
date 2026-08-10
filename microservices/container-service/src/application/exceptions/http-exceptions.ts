import { AppError } from '@/application/exceptions/app-error';

export const unauthorized = (message = 'Unauthorized!') =>
  AppError('UNAUTHORIZED', message);

export const invalidCredentials = (message = 'Invalid credential!') =>
  AppError('INVALID_CREDENTIALS', message);

export const badRequest = (message = 'Invalid request!') =>
  AppError('BAD_REQUEST', message);

export const forbidden = (message = 'Insufficient permissions!') =>
  AppError('FORBIDDEN', message);

export const conflict = (message = 'Conflict!') =>
  AppError('CONFLICT', message);

export const validationError = (message = 'Validation error!') =>
  AppError('VALIDATION_ERROR', message);

export const notFound = (resource: string) =>
  AppError('RESOURCE_NOT_FOUND', `${resource} not found!`);

export const internalServerError = (message = 'Internal server error!') =>
  AppError('INTERNAL_SERVER_ERROR', message);

export const databaseError = (message = 'Database error!') =>
  AppError('DATABASE_ERROR', message);

export const rateLimited = (message = 'Too many requests!') =>
  AppError('RATE_LIMITED', message);

export const serviceUnavailable = (message = 'Service unavailable!') =>
  AppError('SERVICE_UNAVAILABLE', message);
