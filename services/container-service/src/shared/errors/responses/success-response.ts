import type { HttpSuccessCodes } from '../http-codes';

export type SuccessResponse<T> = {
  ok: true;
  data: { code: HttpSuccessCodes; content: T };
  timestamp: string;
};

export const successResponse = <T = unknown>(
  content: T,
  code: HttpSuccessCodes = 'OK',
): SuccessResponse<T> => ({
  ok: true,
  data: { code, content },
  timestamp: new Date().toISOString(),
});
