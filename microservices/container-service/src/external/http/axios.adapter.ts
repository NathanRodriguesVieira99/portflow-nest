import { Logger, OnModuleInit } from '@nestjs/common';
import axios, { AxiosError, type AxiosInstance } from 'axios';
import { ClsService } from 'nestjs-cls';
import { HTTP_ERROR } from '@/domain/constants/http';
import { internalServerError } from '@/application/exceptions/http-exceptions';
import { HttpCodes } from '@/domain/enums/http-codes.enum';
import { type Result, ok, err } from '@/@types/result';
import type {
  HttpClientContract,
  HttpRequest,
} from '../../application/ports/http-client';

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
  }: HttpRequest<T>): Promise<Result<{ status: HttpCodes; data: R }>> {
    try {
      const response = await this.api.request<R>({
        url,
        method,
        headers: {
          ...headers,
          'x-correlation-id': this.cls?.getId() ?? '', // toda request HTTP recebe o correlationId automaticamente via headers
        },
        data: body,
        params,
      });
      return ok({ status: response.status, data: response.data });
    } catch (e) {
      const error = e as AxiosError;
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
