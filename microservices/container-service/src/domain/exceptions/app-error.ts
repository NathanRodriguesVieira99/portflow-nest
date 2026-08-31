import type { Http } from '../types/http';

export type AppError = {
  code: Http.Codes;
  status: Http.Error;
  message: string;
  details?: unknown;
};

export const AppError = (
  code: Http.Codes,
  status: Http.Error,
  message: string,
  details?: unknown,
): AppError => ({
  code,
  status,
  message,
  ...(details !== undefined && { details }),
});
