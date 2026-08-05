import { HTTP_ERROR, type HttpError } from '../constants/http-codes';

export type AppError = {
  code: HttpError;
  status: number;
  message: string;
  details?: unknown;
};

export const AppError = (
  code: HttpError,
  message: string,
  details?: unknown,
): AppError => ({
  code,
  status: HTTP_ERROR[code].status,
  message,
  ...(details !== undefined && { details }),
});
