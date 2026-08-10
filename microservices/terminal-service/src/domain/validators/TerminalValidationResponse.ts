export class TerminalValidationResponse {
  private constructor(
    private terminalId: string,
    private exists: boolean,
    private isActive: boolean,
    private acceptedCargoType: boolean,
    private capacityAvailable: boolean,
    private isTerminalValid: boolean,
    private message: string,
  ) {}

  static validate(
    terminalId: string,
    exists: boolean,
    isActive: boolean,
    acceptedCargoType: boolean,
    capacityAvailable: boolean,
    isTerminalValid: boolean,
    message: string,
  ) {
    return new TerminalValidationResponse(
      terminalId,
      exists,
      isActive,
      acceptedCargoType,
      capacityAvailable,
      isTerminalValid,
      message,
    );
  }

  getTerminalId(): string {
    return this.terminalId;
  }

  getExists(): boolean {
    return this.exists;
  }

  getIsActive(): boolean {
    return this.isActive;
  }

  getAcceptedCargoType(): boolean {
    return this.acceptedCargoType;
  }

  getCapacityAvailable(): boolean {
    return this.capacityAvailable;
  }

  getIsTerminalValid(): boolean {
    return this.isTerminalValid;
  }

  getMessage(): string {
    return this.message;
  }
}
