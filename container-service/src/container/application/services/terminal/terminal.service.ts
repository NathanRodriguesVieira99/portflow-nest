import { Injectable } from '@nestjs/common';
import { TerminalHttp } from '@/container/infrastructure/http/terminal/terminal.http';

import type { Result } from '@Shared/result';
import type { TerminalValidationParams } from '@/container/application/contracts/terminal-validation.params';
import type { TerminalValidationOutput } from '@/container/application/contracts/terminal-validation.output';

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
