import { Inject, Injectable } from '@nestjs/common';
import { TERMINAL_SERVICE_BASE_URL } from '@Shared/constants/constants';
import { type HttpCodes } from '@Shared/constants/http-codes';
import { serviceUnavailable } from '@/container/application/exceptions';
import { type Result, err } from '@Shared/result';
import { RESILIENCE, type ResilienceContract } from '../../resilience';
import { HTTP_CLIENT, type HttpClientContract } from '@Infra/http';

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
    const response = this.resilience.execute(
      async () =>
        await this.http.request<TerminalValidation.Output, never>({
          url: `${TERMINAL_SERVICE_BASE_URL}/terminals/${terminalId}/validation`,
          method: 'GET',
          headers: {},
          params: { cargoType },
        }),
      () =>
        err(
          serviceUnavailable(
            `It was not possible to validate the terminal for the cargo ${cargoType}`,
          ),
        ),
    );
    return response;
  }
}
