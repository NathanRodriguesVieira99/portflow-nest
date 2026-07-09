import { HTTP_ERROR_CODES, type HttpErrorCodes } from '../constants/http-codes';

export type AppError = {
  code: HttpErrorCodes;
  status: number;
  message: string;
  details?: unknown;
};

export const AppError = (
  code: HttpErrorCodes,
  message: string,
  details?: unknown,
): AppError => ({
  code,
  status: HTTP_ERROR_CODES[code].status,
  message,
  ...(details !== undefined && { details }),
});
