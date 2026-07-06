import { Injectable } from '@nestjs/common';
import { TERMINAL_SERVICE_BASE_URL } from '../../../../shared/constants/constants';
import { HttpClient } from '../../../../infrastructure/http/http-client';

import type { Result } from '../../../../shared/errors/result';
import type { TerminalValidationInput } from '../../domain/contracts/terminal-validation.input';
import type { TerminalValidationOutput } from '../../domain/contracts/terminal-validation.output';

@Injectable()
export class TerminalHttp {
  constructor(private readonly http: HttpClient) {}

  async validateTerminal({
    terminalId,
    cargoType,
  }: TerminalValidationInput): Promise<Result<TerminalValidationOutput>> {
    const response = await this.http.request<
      TerminalValidationInput,
      TerminalValidationOutput
    >({
      baseURL: TERMINAL_SERVICE_BASE_URL,
      endpoint: `/terminals/${terminalId}/validacao`,
      method: 'GET',
      headers: {},
      params: { cargoType },
    });

    return response;
  }
}
