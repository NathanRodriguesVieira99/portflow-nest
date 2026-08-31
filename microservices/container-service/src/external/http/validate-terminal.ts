import { Inject, Injectable } from '@nestjs/common';
import { serviceUnavailable } from '@/application/exceptions/exceptions';
import { err, type Result } from '@/domain/types/result';
import { HTTP_CLIENT } from '@/external/http/axios.adapter';
import { env } from '../env';
import {
  RESILIENCE,
  type Resilience,
} from '@/application/ports/resilience/resilience';
import type { HttpClient } from '@/application/ports/http/http-client';
import type { TerminalValidation } from '@/application/ports/http/validate-terminal';
import type { Http } from '@/domain/types/http';

const TERMINAL_SERVICE_BASE_URL = env.TERMINAL_SERVICE_BASE_URL;

@Injectable()
export class TerminalHttp {
  constructor(
    @Inject(HTTP_CLIENT)
    private readonly http: HttpClient,
    @Inject(RESILIENCE)
    private readonly resilience: Resilience,
  ) {}

  async validateTerminal({
    terminalId,
    cargoType,
  }: TerminalValidation.Input): Promise<
    Result<{ status: Http.Codes; data: TerminalValidation.Output }>
  > {
    const result = this.resilience.execute<
      Result<{ status: Http.Codes; data: TerminalValidation.Output }>
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
