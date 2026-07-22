import { Injectable } from '@nestjs/common';
import { TERMINAL_SERVICE_BASE_URL } from '@Shared/constants/constants';
import { HttpClient } from '../clients/http-client';
import { serviceUnavailable } from '@/container/application/exceptions';
import { Resilience } from '../../resilience';
import { err, type Result } from '@Shared/result';

import type { TerminalValidationParams } from '@/container/application/contracts/terminal-validation.params';
import type { TerminalValidationOutput } from '@/container/application/contracts/terminal-validation.output';

@Injectable()
export class TerminalHttp {
  constructor(
    private readonly http: HttpClient,
    private readonly resilience: Resilience,
  ) {}

  async validateTerminal({
    terminalId,
    cargoType,
  }: TerminalValidationParams): Promise<Result<TerminalValidationOutput>> {
    const response = this.resilience.circuitBreakerWithFallback(
      async () => {
        return await this.http.request<TerminalValidationOutput, never>({
          url: `${TERMINAL_SERVICE_BASE_URL}/terminals/${terminalId}/validacao`,
          method: 'GET',
          headers: {},
          params: { cargoType },
        });
      },
      async () => {
        return err(
          serviceUnavailable(
            `It was not possible to validate the terminal for the cargo ${cargoType}`,
          ),
        );
      },
    );
    return response;
  }
}
