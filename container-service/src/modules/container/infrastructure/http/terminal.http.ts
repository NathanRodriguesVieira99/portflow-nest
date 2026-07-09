import { Injectable } from '@nestjs/common';
import { TERMINAL_SERVICE_BASE_URL } from '../../../../shared/constants/constants';
import { HttpClient } from '../../../../infrastructure/http/http-client';

import type { Result } from '../../../../shared/result';
import type { TerminalValidationParams } from '../../domain/contracts/terminal-validation.params';
import type { TerminalValidationOutput } from '../../domain/contracts/terminal-validation.output';

@Injectable()
export class TerminalHttp {
  constructor(private readonly http: HttpClient) {}

  async validateTerminal({
    terminalId,
    cargoType,
  }: TerminalValidationParams): Promise<Result<TerminalValidationOutput>> {
    const response = await this.http.request<TerminalValidationOutput, never>({
      baseURL: TERMINAL_SERVICE_BASE_URL,
      endpoint: `/terminals/${terminalId}/validacao`,
      method: 'GET',
      headers: {},
      params: { cargoType },
    });

    return response;
  }
}
