export const HTTP_SUCCESS_CODES = {
  // Success (200,201,204)
  OK: { code: 'OK', status: 200 },
  CREATED: { code: 'CREATED', status: 201 },
  ACCEPTED: { code: 'ACCEPTED', status: 202 },
  NO_CONTENT: { code: 'NO_CONTENT', status: 204 },
} as const;

export const HTTP_ERROR_CODES = {
  // Authentication & Authorization (401, 403)
  UNAUTHORIZED: { code: 'UNAUTHORIZED', status: 401 },
  INVALID_CREDENTIALS: { code: 'INVALID_CREDENTIALS', status: 401 },
  INVALID_TOKEN: { code: 'INVALID_TOKEN', status: 401 },
  TOKEN_EXPIRED: { code: 'TOKEN_EXPIRED', status: 401 },
  INSUFFICIENT_PERMISSIONS: { code: 'INSUFFICIENT_PERMISSIONS', status: 403 },
  FORBIDDEN: { code: 'FORBIDDEN', status: 403 },

  // Client Errors (400, 404, 409, 422,429)
  BAD_REQUEST: { code: 'BAD_REQUEST', status: 400 },
  CONFLICT: { code: 'CONFLICT', status: 409 },
  VALIDATION_ERROR: { code: 'VALIDATION_ERROR', status: 422 },
  RESOURCE_NOT_FOUND: { code: 'RESOURCE_NOT_FOUND', status: 404 },
  RATE_LIMITED: { code: 'RATE_LIMITED', status: 429 },

  // Server Errors (500,503)
  INTERNAL_SERVER_ERROR: { code: 'INTERNAL_SERVER_ERROR', status: 500 },
  DATABASE_ERROR: { code: 'DATABASE_ERROR', status: 500 },
  SERVICE_UNAVAILABLE: { code: 'SERVICE_UNAVAILABLE', status: 503 },
} as const;

export type HttpSuccessCodes = keyof typeof HTTP_SUCCESS_CODES;
export type HttpErrorCodes = keyof typeof HTTP_ERROR_CODES;
