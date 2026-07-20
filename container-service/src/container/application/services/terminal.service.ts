import { Injectable } from '@nestjs/common';
import { TerminalHttp } from '@Infra/http/terminal.http';

import type { Result } from '@Shared/result';
import type { TerminalValidationParams } from '@Contracts/terminal-validation.params';
import type { TerminalValidationOutput } from '@Contracts/terminal-validation.output';

@Injectable()
export class TerminalService {
  constructor(private readonly http: TerminalHttp) {}

  async validateTerminal({
    terminalId,
    cargoType,
  }: TerminalValidationParams): Promise<Result<TerminalValidationOutput>> {
    return this.http.validateTerminal({ terminalId, cargoType });
  }
}
