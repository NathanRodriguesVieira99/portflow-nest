import { Injectable } from '@nestjs/common';
import { TerminalHttp } from '../../infrastructure/http/terminal.http';

import type { Result } from '../../../../shared/errors/result';
import type {
  TerminalValidationRequest,
  TerminalValidationResponse,
} from '../../domain/contracts/terminal-validation.input';

@Injectable()
export class TerminalService {
  constructor(private readonly http: TerminalHttp) {}

  async validateTerminal({
    terminalId,
    cargoType,
  }: TerminalValidationRequest): Promise<Result<TerminalValidationResponse>> {
    return this.http.validateTerminal({ terminalId, cargoType });
  }
}
