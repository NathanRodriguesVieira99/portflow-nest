import { Inject, Injectable } from '@nestjs/common';
import { TERMINAL_SERVICE_BASE_URL } from '@/domain/constants/constants';
import { serviceUnavailable } from '@/application/exceptions/http-exceptions';
import { HTTP_CLIENT } from '@/external/http/axios.adapter';
import {
  RESILIENCE,
  type ResilienceContract,
} from '../../infra/resilience/resilience';
import { type Result, err } from '@/@types/result';
import type { HttpClientContract } from '@/infra/http/http-client';
import type { HttpCodes } from '@/domain/enums/http-codes.enum';

export namespace TerminalValidation {
  export type Input = { terminalId: string; cargoType: string };
  export type Output = {
    terminalId: string;
    exists: boolean;
    isActive: boolean;
    isCargoTypeAccepted: boolean;
    availableCapacity: boolean;
    isTerminalValid: boolean;
    message: string;
  };
}

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
  }: TerminalValidation.Input): Promise<
    Result<{ status: HttpCodes; data: TerminalValidation.Output }>
  > {
    const result = this.resilience.execute<
      Result<{ status: HttpCodes; data: TerminalValidation.Output }>
    >(
      async () => {
        const response = await this.http.request<
          TerminalValidation.Output,
          never
        >({
          url: `${TERMINAL_SERVICE_BASE_URL}/terminals/${terminalId}/validation`,
          method: 'GET',
          headers: {},
          params: { cargoType },
        });
        if (!response.ok) throw response.error;
        return response;
      },
      () =>
        err(
          serviceUnavailable(
            `It was not possible to validate the terminal for the cargo ${cargoType}`,
          ),
        ),
    );
    return result;
  }
}
