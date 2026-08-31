import { AppError } from '@/domain/exceptions/app-error';
import { Http } from '@/domain/types/http';

export const unauthorized = (message = 'Unauthorized!') =>
  AppError(Http.Codes.UNAUTHORIZED, 'UNAUTHORIZED', message);

export const invalidCredentials = (message = 'Invalid credential!') =>
  AppError(Http.Codes.UNAUTHORIZED, 'INVALID_CREDENTIALS', message);

export const badRequest = (message = 'Invalid request!') =>
  AppError(Http.Codes.BAD_REQUEST, 'BAD_REQUEST', message);

export const forbidden = (message = 'Insufficient permissions!') =>
  AppError(Http.Codes.FORBIDDEN, 'FORBIDDEN', message);

export const conflict = (message = 'Conflict!') =>
  AppError(Http.Codes.CONFLICT, 'CONFLICT', message);

export const validationError = (message = 'Validation error!') =>
  AppError(Http.Codes.UNPROCESSABLE_ENTITY, 'VALIDATION_ERROR', message);

export const notFound = (resource: string) =>
  AppError(
    Http.Codes.NOT_FOUND,
    'RESOURCE_NOT_FOUND',
    `${resource} not found!`,
  );

export const internalServerError = (message = 'Internal server error!') =>
  AppError(Http.Codes.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR', message);

export const databaseError = (message = 'Database error!') =>
  AppError(Http.Codes.INTERNAL_SERVER_ERROR, 'DATABASE_ERROR', message);

export const rateLimited = (message = 'Too many requests!') =>
  AppError(Http.Codes.RATE_LIMITED, 'RATE_LIMITED', message);

export const serviceUnavailable = (message = 'Service unavailable!') =>
  AppError(Http.Codes.SERVICE_UNAVAILABLE, 'SERVICE_UNAVAILABLE', message);
