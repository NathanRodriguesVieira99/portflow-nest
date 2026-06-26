import { Injectable } from '@nestjs/common';

import { HttpMethod } from '@/infrastructure/http/http-client.types';
import { HttpClient } from '@/infrastructure/http/http-client';

import type {
  TerminalValidationRequest,
  TerminalValidationResponse,
} from './terminal.http.contract';

@Injectable()
export class TerminalHttp {
  constructor(private readonly http: HttpClient) {}

  async validateTerminal({
    terminalId,
    cargoType,
  }: TerminalValidationRequest): Promise<TerminalValidationResponse> {
    const body = { terminalId, cargoType };

    const validateTerminal = await this.http.request<
      TerminalValidationRequest,
      TerminalValidationResponse
    >({
      baseURL: 'http://localhost:3434',
      endpoint: `/terminais/${terminalId}/validacao`,
      method: HttpMethod.POST,
      body,
      params: {},
    });

    return validateTerminal;
  }
}
