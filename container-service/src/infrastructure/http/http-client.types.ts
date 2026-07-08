import { Result } from '../../shared/errors/result';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpRequest<T> = {
  baseURL: string;
  endpoint: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  body?: T;
};

export interface IHttpClient {
  request: <T, R>({
    baseURL,
    endpoint,
    method,
    headers,
    params,
    body,
  }: HttpRequest<T>) => Promise<Result<R>>;
}
