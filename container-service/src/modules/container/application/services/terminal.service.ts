import { Injectable } from '@nestjs/common';
import { TerminalHttp } from '../../infrastructure/http/terminal.http';

import type { Result } from '../../../../shared/errors/result';
import type { TerminalValidationParams } from '../../domain/contracts/terminal-validation.params';
import type { TerminalValidationOutput } from '../../domain/contracts/terminal-validation.output';

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
