import { Injectable } from '@nestjs/common';

import { HttpClient } from '../../../../infrastructure/http/http-client';
import { HttpMethod } from '../../../../infrastructure/http/http-client.types';

import type {
  TerminalValidationRequest,
  TerminalValidationResponse,
} from './terminal.http.contract';

const TERMINAL_SERVICE_BASE_URL = 'http://localhost:3434';

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
      baseURL: TERMINAL_SERVICE_BASE_URL,
      endpoint: `/terminais/${terminalId}/validacao`,
      method: HttpMethod.POST,
      body,
      params: {},
    });

    return validateTerminal;
  }
}
