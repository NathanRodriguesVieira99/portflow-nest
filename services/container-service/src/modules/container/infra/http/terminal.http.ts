import { Injectable } from '@nestjs/common';
import { HttpClient } from '../../../../infrastructure/http/http-client';
import { TERMINAL_SERVICE_BASE_URL } from '../../../../shared/constants/constants';

import type { Result } from '../../../../shared/errors/result';
import type {
  TerminalValidationRequest,
  TerminalValidationResponse,
} from '../../domain/contracts/terminal.http.contract';

@Injectable()
export class TerminalHttp {
  constructor(private readonly http: HttpClient) {}

  async validateTerminal({
    terminalId,
    cargoType,
  }: TerminalValidationRequest): Promise<Result<TerminalValidationResponse>> {
    const body = { terminalId, cargoType };

    const validateTerminal = await this.http.request<
      TerminalValidationRequest,
      TerminalValidationResponse
    >({
      baseURL: TERMINAL_SERVICE_BASE_URL,
      endpoint: `/terminals/${terminalId}/validacao`,
      method: 'POST',
      headers: {},
      body,
      params: {},
    });

    return validateTerminal;
  }
}
