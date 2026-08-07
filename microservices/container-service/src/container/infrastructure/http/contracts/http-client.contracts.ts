import type { HttpCodes } from '@Shared/constants/http-codes';
import type { Result } from '@Shared/result';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpRequest<T = unknown> = {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  body?: T;
};

export interface HttpClientContract {
  request: <R, T = unknown>({
    url,
    method,
    headers,
    params,
    body,
  }: HttpRequest<T>) => Promise<Result<{ status: HttpCodes; data: R }>>;
}
