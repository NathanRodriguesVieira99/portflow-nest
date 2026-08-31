import type { Http } from '@/domain/types/http';
import type { Result } from '@/domain/types/result';

export namespace TerminalValidation {
  export type Input = { terminalId: string; cargoType: string };
  export type Output = Result<{
    status: Http.Codes;
    data: {
      terminalId: string;
      exists: boolean;
      isActive: boolean;
      isCargoTypeAccepted: boolean;
      availableCapacity: boolean;
      isTerminalValid: boolean;
      message: string;
    };
  }>;
}

export interface TerminalHttpContract {
  validateTerminal: ({
    terminalId,
    cargoType,
  }: TerminalValidation.Input) => Promise<TerminalValidation.Output>;
}

export const TERMINAL_HTTP_CONTRACT = Symbol('TerminalHttpContract');
