import {
  HTTP_ERROR,
  HTTP_SUCCESS,
  type HttpError,
  type HttpSuccess,
} from '@/domain/constants/http';

export namespace Response {
  export type Error = {
    ok: false;
    error: {
      code: HttpError;
      status: number;
      message: string;
    };
    timestamp: string;
  };
  export type Success<T> = {
    ok: true;
    response: { code: HttpSuccess; status: number; content: T };
    timestamp: string;
  };
}

export const errorResponse = (
  code: HttpError,
  message: string,
): Response.Error => ({
  ok: false,
  error: { code, status: HTTP_ERROR[code].status, message },
  timestamp: new Date().toISOString(),
});

export const successResponse = <T = unknown>(
  content: T,
  code: HttpSuccess = 'OK',
): Response.Success<T> => ({
  ok: true,
  response: { code, status: HTTP_SUCCESS[code].status, content },
  timestamp: new Date().toISOString(),
});

export type RequestResponse<T> = Response.Success<T> | Response.Error;
