import { Injectable } from '@nestjs/common';

import { HttpClient } from '../../../../../infrastructure/http/http-client';
import { HttpMethod } from '../../../../../infrastructure/http/http-client.types';

import { TERMINAL_SERVICE_BASE_URL } from '../../../../../constants/constants';

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
      baseURL: TERMINAL_SERVICE_BASE_URL,
      endpoint: `/terminais/${terminalId}/validacao`,
      method: HttpMethod.POST,
      headers: {},
      body,
      params: {},
    });

    return validateTerminal;
  }
}
