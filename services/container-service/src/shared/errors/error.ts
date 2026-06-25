import type { HttpCodes } from './exceptions/http-codes';

export type Error = { code: HttpCodes; message: string; details?: unknown };

export const Error = (
  code: HttpCodes,
  message: string,
  details?: unknown,
): Error => ({
  code,
  message,
  ...(details !== undefined && { details }),
});
