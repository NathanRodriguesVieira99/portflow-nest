export interface TerminalValidationOutput {
  terminalId: string;
  exists: boolean;
  isActive: boolean;
  isCargoTypeAccepted: boolean;
  availableCapacity: boolean;
  isTerminalValid: boolean;
  message: string;
}
