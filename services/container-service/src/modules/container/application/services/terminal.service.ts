import { Injectable } from '@nestjs/common';

import { TerminalHttp } from '../../infra/http/terminal.http';

import type {
  TerminalValidationRequest,
  TerminalValidationResponse,
} from '../../infra/http/terminal.http.contract';

@Injectable()
export class TerminalService {
  constructor(private readonly http: TerminalHttp) {}

  async validateTerminal({
    terminalId,
    cargoType,
  }: TerminalValidationRequest): Promise<TerminalValidationResponse> {
    return this.http.validateTerminal({ terminalId, cargoType });
  }
}
