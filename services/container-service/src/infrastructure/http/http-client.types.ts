export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export type HttpRequest<T> = {
  baseURL: string;
  endpoint: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  body?: T;
};

export interface IHttpClient {
  request: <T, R>(request: HttpRequest<T>) => Promise<R>;
}
