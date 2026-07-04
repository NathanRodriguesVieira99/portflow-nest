import type { HttpErrorCodes } from '../http-codes';

export type ErrorResponse = {
  ok: false;
  error: {
    code: HttpErrorCodes;
    message: string;
  };
  timestamp: string;
};

export const errorResponse = (
  code: HttpErrorCodes,
  message: string,
): ErrorResponse => ({
  ok: false,
  error: { code, message },
  timestamp: new Date().toISOString(),
});
