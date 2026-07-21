import { Injectable } from '@nestjs/common';
import { TERMINAL_SERVICE_BASE_URL } from '@Shared/constants/constants';
import { HttpClient } from '../clients/http-client';

import { err, type Result } from '@Shared/result';
import type { TerminalValidationParams } from '@/container/application/contracts/terminal-validation.params';
import type { TerminalValidationOutput } from '@/container/application/contracts/terminal-validation.output';
import type { CircuitBreaker } from '../../resilience/circuit-breaker';
import { serviceUnavailable } from '@/container/application/exceptions';

@Injectable()
export class TerminalHttp {
  constructor(
    private readonly http: HttpClient,
    private readonly breaker: CircuitBreaker,
  ) {}

  async validateTerminal({
    terminalId,
    cargoType,
  }: TerminalValidationParams): Promise<Result<TerminalValidationOutput>> {
    try {
      const response = this.breaker.execute(async () => {
        return await this.http.request<TerminalValidationOutput, never>({
          url: `${TERMINAL_SERVICE_BASE_URL}/terminals/${terminalId}/validacao`,
          method: 'GET',
          headers: {},
          params: { cargoType },
        });
      });
      return response;
    } catch {
      return err(serviceUnavailable('circuit breaker is open'));
    }
  }
}
