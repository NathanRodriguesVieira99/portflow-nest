import type { Http } from '@/domain/types/http';
import type { Result } from '@/domain/types/result';

export type HttpRequest<T = unknown> = {
  url: string;
  method: Http.Method;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  body?: T;
};

export interface HttpClient {
  request: <R, T = unknown>({
    url,
    method,
    headers,
    params,
    body,
  }: HttpRequest<T>) => Promise<Result<{ status: Http.Codes; data: R }>>;
}
