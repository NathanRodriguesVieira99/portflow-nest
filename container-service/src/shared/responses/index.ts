import {
  HTTP_ERROR_CODES,
  HTTP_SUCCESS_CODES,
  type HttpErrorCodes,
  type HttpSuccessCodes,
} from '../constants/http-codes';

export type ErrorResponse = {
  ok: false;
  error: {
    code: HttpErrorCodes;
    status: number;
    message: string;
  };
  timestamp: string;
};

export type SuccessResponse<T> = {
  ok: true;
  response: { code: HttpSuccessCodes; status: number; content: T };
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

export const successResponse = <T = unknown>(
  content: T,
  code: HttpSuccessCodes = 'OK',
): SuccessResponse<T> => ({
  ok: true,
  response: { code, status: HTTP_SUCCESS_CODES[code].status, content },
  timestamp: new Date().toISOString(),
});

export type RequestResponse<T> = SuccessResponse<T> | ErrorResponse;
