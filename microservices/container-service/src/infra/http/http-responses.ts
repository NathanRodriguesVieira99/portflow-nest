import { Http } from '@/domain/types/http';

export namespace Response {
  export type Error = {
    ok: false;
    error: {
      code: Http.Codes;
      status: Http.Error;
      message: string;
    };
    timestamp: string;
  };
  export type Success<T> = {
    ok: true;
    response: { code: Http.Codes; status: Http.Success; content: T };
    timestamp: string;
  };
}

export const errorResponse = (
  code: Http.Codes,
  status: Http.Error,
  message: string,
): Response.Error => ({
  ok: false,
  error: { code, status, message },
  timestamp: new Date().toISOString(),
});

export const successResponse = <T = unknown>(
  content: T,
  code: Http.Codes = 200,
  status: Http.Success = 'OK',
): Response.Success<T> => ({
  ok: true,
  response: { code, status, content },
  timestamp: new Date().toISOString(),
});

export type RequestResponse<T> = Response.Success<T> | Response.Error;
