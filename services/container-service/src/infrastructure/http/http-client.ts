import { Injectable, Logger, OnModuleInit, Optional } from '@nestjs/common';
import axios, { type AxiosError, type AxiosInstance } from 'axios';
import { IHttpClient, HttpRequest } from './http-client.types';
import { err, ok, type Result } from '../../shared/errors/result';
import { HTTP_ERROR_CODES } from '../../shared/errors/http-codes';
import { internalServerError } from '../../shared/errors/exceptions/exceptions';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class HttpClient implements IHttpClient, OnModuleInit {
  private logger = new Logger(HttpClient.name);

  /*
   @Optional diz ao NestJs para não lançar erro se não encontrar um provider para aquele parâmetro na DI.
   Em vez disso, ele deixa o parâmetro undefined ou com o valor default.
   */
  constructor(
    @Optional() private readonly api: AxiosInstance = axios,
    private readonly cls: ClsService,
  ) {}

  onModuleInit() {
    this.logger.log('Axios HTTP Client Started!');
  }

  async request<T, R>({
    baseURL,
    endpoint,
    method,
    headers,
    params,
    body,
  }: HttpRequest<T>): Promise<Result<R>> {
    try {
      const { data } = await this.api.request<R>({
        baseURL,
        url: endpoint,
        method,
        headers: {
          ...headers,
          'x-correlation-id': this.cls.getId() ?? '', // toda request HTTP recebe o correlationId automaticamente via headers
        },
        data: body,
        params,
      });

      return ok(data);
    } catch (e) {
      const error = e as AxiosError;

      this.logger.error('HTTP ERROR', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        url: error.config?.url,
        method: error.config?.method,
      });

      const status =
        error.response?.status || HTTP_ERROR_CODES.INTERNAL_SERVER_ERROR;
      const message = error.response?.data || error.message;

      return err(
        internalServerError(`Request failed with status ${status}: ${message}`),
      );
    }
  }
}
