import { Logger, OnModuleInit } from '@nestjs/common';
import axios, { AxiosError, type AxiosInstance } from 'axios';
import { ClsService } from 'nestjs-cls';
import { HTTP_ERROR } from '@Shared/constants/http-codes';
import { internalServerError } from '@/container/application/exceptions';
import { type Result, ok, err } from '@Shared/result';

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
  }: HttpRequest<T>) => Promise<Result<R>>;
}

export class AxiosAdapter implements HttpClientContract, OnModuleInit {
  private logger = new Logger(AxiosAdapter.name);

  constructor(
    private readonly api: AxiosInstance,
    private readonly cls?: ClsService,
  ) {}

  static create(cls?: ClsService): AxiosAdapter {
    return new AxiosAdapter(axios, cls);
  }

  onModuleInit() {
    this.logger.log('Http Client Started!');
  }

  async request<R, T = unknown>({
    url,
    method,
    headers,
    params,
    body,
  }: HttpRequest<T>): Promise<Result<R>> {
    try {
      const { data: responseData } = await this.api.request<R>({
        url,
        method,
        headers: {
          ...headers,
          'x-correlation-id': this.cls?.getId() ?? '', // toda request HTTP recebe o correlationId automaticamente via headers
        },
        data: body,
        params,
      });

      return ok(responseData);
    } catch (e) {
      const error = e as AxiosError;

      this.logger.error('HTTP ERROR', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        url: error.config?.url,
        method: error.config?.method,
      });

      const status = error.response?.status || HTTP_ERROR.INTERNAL_SERVER_ERROR;
      const message = error.response?.data || error.message;

      return err(
        internalServerError(
          `Request failed with status ${status} : ${message}`,
        ),
      );
    }
  }
}

export const HTTP_CLIENT = Symbol('HTTP_CLIENT');
