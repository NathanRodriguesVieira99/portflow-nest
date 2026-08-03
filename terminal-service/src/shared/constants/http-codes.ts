export enum HttpCodes {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  RATE_LIMITED = 429,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export const HTTP_SUCCESS = {
  OK: { code: 'OK', status: HttpCodes.OK },
  CREATED: { code: 'CREATED', status: HttpCodes.CREATED },
  ACCEPTED: { code: 'ACCEPTED', status: HttpCodes.ACCEPTED },
  NO_CONTENT: { code: 'NO_CONTENT', status: HttpCodes.NO_CONTENT },
} as const;

export const HTTP_ERROR = {
  UNAUTHORIZED: { code: 'UNAUTHORIZED', status: HttpCodes.UNAUTHORIZED },
  INVALID_CREDENTIALS: {
    code: 'INVALID_CREDENTIALS',
    status: HttpCodes.UNAUTHORIZED,
  },
  INVALID_TOKEN: { code: 'INVALID_TOKEN', status: HttpCodes.UNAUTHORIZED },
  TOKEN_EXPIRED: { code: 'TOKEN_EXPIRED', status: HttpCodes.UNAUTHORIZED },
  INSUFFICIENT_PERMISSIONS: {
    code: 'INSUFFICIENT_PERMISSIONS',
    status: HttpCodes.FORBIDDEN,
  },
  FORBIDDEN: { code: 'FORBIDDEN', status: HttpCodes.FORBIDDEN },

  BAD_REQUEST: { code: 'BAD_REQUEST', status: HttpCodes.BAD_REQUEST },
  CONFLICT: { code: 'CONFLICT', status: HttpCodes.CONFLICT },
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    status: HttpCodes.UNPROCESSABLE_ENTITY,
  },
  RESOURCE_NOT_FOUND: {
    code: 'RESOURCE_NOT_FOUND',
    status: HttpCodes.NOT_FOUND,
  },
  RATE_LIMITED: { code: 'RATE_LIMITED', status: HttpCodes.RATE_LIMITED },

  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    status: HttpCodes.INTERNAL_SERVER_ERROR,
  },
  DATABASE_ERROR: {
    code: 'DATABASE_ERROR',
    status: HttpCodes.INTERNAL_SERVER_ERROR,
  },
  SERVICE_UNAVAILABLE: {
    code: 'SERVICE_UNAVAILABLE',
    status: HttpCodes.SERVICE_UNAVAILABLE,
  },
} as const;

export type HttpSuccess = keyof typeof HTTP_SUCCESS;
export type HttpError = keyof typeof HTTP_ERROR;
