import { Injectable } from '@nestjs/common';
import { TERMINAL_SERVICE_BASE_URL } from '@Shared/constants/constants';
import { HttpClient } from '../../../infrastructure/http/http-client';

import type { Result } from '@Shared/result';
import type { TerminalValidationParams } from '@Contracts/terminal-validation.params';
import type { TerminalValidationOutput } from '@Contracts/terminal-validation.output';

@Injectable()
export class TerminalHttp {
  constructor(private readonly http: HttpClient) {}

  async validateTerminal({
    terminalId,
    cargoType,
  }: TerminalValidationParams): Promise<Result<TerminalValidationOutput>> {
    const response = await this.http.request<TerminalValidationOutput, never>({
      url: `${TERMINAL_SERVICE_BASE_URL}/terminals/${terminalId}/validacao`,
      method: 'GET',
      headers: {},
      params: { cargoType },
    });

    return response;
  }
}
