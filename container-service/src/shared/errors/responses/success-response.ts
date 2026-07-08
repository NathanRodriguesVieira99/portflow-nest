import { HTTP_SUCCESS_CODES, type HttpSuccessCodes } from '../http-codes';

export type SuccessResponse<T> = {
  ok: true;
  response: { code: HttpSuccessCodes; status: number; content: T };
  timestamp: string;
};

export const successResponse = <T = unknown>(
  content: T,
  code: HttpSuccessCodes = 'OK',
): SuccessResponse<T> => ({
  ok: true,
  response: { code, status: HTTP_SUCCESS_CODES[code].status, content },
  timestamp: new Date().toISOString(),
});
