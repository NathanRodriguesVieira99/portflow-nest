import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import axios, { type AxiosError, type AxiosInstance } from 'axios';

import { IHttpClient, HttpRequest } from './http-client.types';

@Injectable()
export class HttpClient implements IHttpClient, OnModuleInit {
  private logger = new Logger(HttpClient.name);

  constructor(private readonly api: AxiosInstance = axios) {}

  static create(): IHttpClient {
    return new HttpClient();
  }

  onModuleInit() {
    this.logger.log('AXIOS HTTP CLIENT STARTED!');
  }

  async request<T, R>({
    baseURL,
    endpoint,
    method,
    headers,
    params,
    body,
  }: HttpRequest<T>) {
    try {
      const { data } = await this.api.request<R>({
        baseURL,
        url: endpoint,
        method,
        headers,
        data: body,
        params,
      });
      return data;
    } catch (err) {
      const error = err as AxiosError;
      this.logger.error('HTTP ERROR', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        url: error.config?.url,
        method: error.config?.method,
      });
      const status = error.response?.status || 500;
      const message = error.response?.data || error.message;
      throw new Error(`Request failed with status ${status}: ${message}`);
    }
  }
}
