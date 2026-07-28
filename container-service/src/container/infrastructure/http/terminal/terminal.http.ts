import { Inject, Injectable } from '@nestjs/common';
import { TERMINAL_SERVICE_BASE_URL } from '@Shared/constants/constants';
import { RESILIENCE, ResilienceContract } from '../../resilience';
import { serviceUnavailable } from '@/container/application/exceptions';
import { type Result, err } from '@Shared/result';

import type {
  TerminalValidationOutput,
  TerminalValidationParams,
} from '@/container/application/contracts/terminal-validation';
import {
  HTTP_CLIENT,
  type HttpClientContract,
} from '../adapters/axios.adapter';

@Injectable()
export class TerminalHttp {
  constructor(
    @Inject(HTTP_CLIENT)
    private readonly http: HttpClientContract,
    @Inject(RESILIENCE)
    private readonly resilience: ResilienceContract,
  ) {}

  async validateTerminal({
    terminalId,
    cargoType,
  }: TerminalValidationParams): Promise<Result<TerminalValidationOutput>> {
    const response = this.resilience.execute(
      async () => {
        return await this.http.request<TerminalValidationOutput, never>({
          url: `${TERMINAL_SERVICE_BASE_URL}/terminals/${terminalId}/validation`,
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
