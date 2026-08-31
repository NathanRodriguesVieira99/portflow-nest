export namespace Http {
  export enum Codes {
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
  export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  export type Success = keyof typeof HTTP_SUCCESS;
  export type Error = keyof typeof HTTP_ERROR;
}

export const HTTP_SUCCESS = {
  OK: { status: 'OK', code: Http.Codes.OK },
  CREATED: { status: 'CREATED', code: Http.Codes.CREATED },
  ACCEPTED: { status: 'ACCEPTED', code: Http.Codes.ACCEPTED },
  NO_CONTENT: { status: 'NO_CONTENT', code: Http.Codes.NO_CONTENT },
} as const;

export const HTTP_ERROR = {
  UNAUTHORIZED: { status: 'UNAUTHORIZED', code: Http.Codes.UNAUTHORIZED },
  INVALID_CREDENTIALS: {
    status: 'INVALID_CREDENTIALS',
    code: Http.Codes.UNAUTHORIZED,
  },
  INVALID_TOKEN: { status: 'INVALID_TOKEN', code: Http.Codes.UNAUTHORIZED },
  TOKEN_EXPIRED: { status: 'TOKEN_EXPIRED', code: Http.Codes.UNAUTHORIZED },
  INSUFFICIENT_PERMISSIONS: {
    status: 'INSUFFICIENT_PERMISSIONS',
    code: Http.Codes.FORBIDDEN,
  },
  FORBIDDEN: { status: 'FORBIDDEN', code: Http.Codes.FORBIDDEN },

  BAD_REQUEST: { status: 'BAD_REQUEST', code: Http.Codes.BAD_REQUEST },
  CONFLICT: { status: 'CONFLICT', code: Http.Codes.CONFLICT },
  VALIDATION_ERROR: {
    status: 'VALIDATION_ERROR',
    code: Http.Codes.UNPROCESSABLE_ENTITY,
  },
  RESOURCE_NOT_FOUND: {
    status: 'RESOURCE_NOT_FOUND',
    code: Http.Codes.NOT_FOUND,
  },
  RATE_LIMITED: { status: 'RATE_LIMITED', code: Http.Codes.RATE_LIMITED },

  INTERNAL_SERVER_ERROR: {
    status: 'INTERNAL_SERVER_ERROR',
    code: Http.Codes.INTERNAL_SERVER_ERROR,
  },
  DATABASE_ERROR: {
    status: 'DATABASE_ERROR',
    code: Http.Codes.INTERNAL_SERVER_ERROR,
  },
  SERVICE_UNAVAILABLE: {
    status: 'SERVICE_UNAVAILABLE',
    code: Http.Codes.SERVICE_UNAVAILABLE,
  },
} as const;
