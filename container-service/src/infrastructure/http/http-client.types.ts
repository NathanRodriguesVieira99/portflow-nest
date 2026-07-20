import { Result } from '../../shared/result';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpRequest<T = unknown> = {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  body?: T;
};

export interface IHttpClient {
  request: <R, T = unknown>({
    url,
    method,
    headers,
    params,
    body,
  }: HttpRequest<T>) => Promise<Result<R>>;
}
