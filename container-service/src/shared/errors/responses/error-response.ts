import { HttpErrorCodes, HTTP_ERROR_CODES } from '../http-codes';

export type ErrorResponse = {
  ok: false;
  error: {
    code: HttpErrorCodes;
    status: number;
    message: string;
  };
  timestamp: string;
};

export const errorResponse = (
  code: HttpErrorCodes,
  message: string,
): ErrorResponse => ({
  ok: false,
  error: { code, status: HTTP_ERROR_CODES[code].status, message },
  timestamp: new Date().toISOString(),
});
