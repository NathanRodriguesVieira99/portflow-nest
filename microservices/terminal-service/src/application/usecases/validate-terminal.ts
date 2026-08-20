import { Inject, Injectable } from '@nestjs/common';
import { Terminal } from '@/domain/entities/terminal';
import { TerminalValidationResponse } from '@/domain/validators/TerminalValidationResponse';
import { ok, type Result } from '@/@types/result';
import {
  TERMINAL_REPOSITORY_CONTRACT,
  type MongooseTerminalRepositoryContract,
} from '@/application/repositories/mongoose-terminal.repository.contract';

@Injectable()
export class ValidateTerminalUseCase {
  constructor(
    @Inject(TERMINAL_REPOSITORY_CONTRACT)
    private readonly repo: MongooseTerminalRepositoryContract,
  ) {}

  async execute(
    terminalId: string,
    cargoType: string,
  ): Promise<Result<TerminalValidationResponse>> {
    const terminal = await this.repo.findTerminalById(terminalId);
    if (!terminal.ok) {
      return ok(
        TerminalValidationResponse.validate(
          terminalId,
          false,
          false,
          false,
          false,
          false,
          'Terminal not found',
        ),
      );
    }
    return ok(await this.validateExistingTerminal(terminal.value, cargoType));
  }

  private async validateExistingTerminal(
    terminal: Terminal,
    cargoType: string,
  ): Promise<TerminalValidationResponse> {
    const isActive = terminal.getIsActive();
    const acceptedCargoType = terminal.acceptCargoType(cargoType);
    const availableCapacity = this.hasAvailableCapacity(terminal);
    const isTerminalValid = isActive && acceptedCargoType && availableCapacity;

    const message = this.buildMessage(
      terminal.getTerminalId(),
      cargoType,
      isActive,
      acceptedCargoType,
      availableCapacity,
      isTerminalValid,
    );

    return TerminalValidationResponse.validate(
      terminal.getTerminalId(),
      true,
      isActive,
      acceptedCargoType,
      availableCapacity,
      isTerminalValid,
      message,
    );
  }

  private hasAvailableCapacity(terminal: Terminal): boolean {
    const hasCapacity = terminal.getCapacity();
    if (!hasCapacity) return false;
    return hasCapacity.hasAvailableCapacity();
  }

  private buildMessage(
    terminalId: string,
    cargoType: string,
    isActive: boolean,
    acceptCargoType: boolean,
    availableCapacity: boolean,
    isTerminalValid: boolean,
  ): string {
    if (isTerminalValid) {
      return `Terminal ${terminalId} is available to receive cargo of type ${cargoType}`;
    }
    if (!isActive) return `Terminal ${terminalId} is inactive`;
    if (!acceptCargoType) {
      return `Terminal ${terminalId} not accept cargo of type ${cargoType}`;
    }
    if (!availableCapacity) {
      return `Terminal ${terminalId} don't have available capacity `;
    }

    return `Terminal ${terminalId} is invalid for this operation`;
  }
}
