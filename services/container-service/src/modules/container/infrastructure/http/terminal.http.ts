import { Injectable } from '@nestjs/common';
import { TERMINAL_SERVICE_BASE_URL } from '../../../../shared/constants/constants';

import type { Result } from '../../../../shared/errors/result';
import type { IHttpClient } from '@/infrastructure/http/http-client.types';
import type {
  TerminalValidationRequest,
  TerminalValidationResponse,
} from '../../domain/contracts/terminal-validation.input';

@Injectable()
export class TerminalHttp {
  constructor(private readonly http: IHttpClient) {}

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
