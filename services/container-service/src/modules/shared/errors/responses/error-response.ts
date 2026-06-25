import type { Error } from '../error';

export type ErrorResponse = {
  ok: false;
  status: number;
  error: {
    code: Error['code'];
    message: string;
  };
  timestamp: string;
};

export const errorResponse = (
  code: Error['code'],
  status: number,
  message: string,
): ErrorResponse => ({
  ok: false,
  status,
  error: { code, message },
  timestamp: new Date().toISOString(),
});
