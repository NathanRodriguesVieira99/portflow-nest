import type { HttpErrorCodes } from './http-codes';

export type AppError = {
  code: HttpErrorCodes;
  message: string;
  details?: unknown;
};

export const AppError = (
  code: HttpErrorCodes,
  message: string,
  details?: unknown,
): AppError => ({
  code,
  message,
  ...(details !== undefined && { details }),
});
