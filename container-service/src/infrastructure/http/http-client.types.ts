import { Result } from '../../shared/result';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpRequest<T = unknown> = {
  baseURL: string;
  endpoint: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  body?: T;
};

export interface IHttpClient {
  request: <R, T = unknown>({
    baseURL,
    endpoint,
    method,
    headers,
    params,
    body,
  }: HttpRequest<T>) => Promise<Result<R>>;
}
