import { Injectable } from '@nestjs/common';
import { TerminalHttp } from '../../infrastructure/http/terminal.http';

import type { Result } from '../../../../shared/errors/result';
import type { TerminalValidationInput } from '../../domain/contracts/terminal-validation.input';
import type { TerminalValidationOutput } from '../../domain/contracts/terminal-validation.output';

@Injectable()
export class TerminalService {
  constructor(private readonly http: TerminalHttp) {}

  async validateTerminal({
    terminalId,
    cargoType,
  }: TerminalValidationInput): Promise<Result<TerminalValidationOutput>> {
    return this.http.validateTerminal({ terminalId, cargoType });
  }
}
