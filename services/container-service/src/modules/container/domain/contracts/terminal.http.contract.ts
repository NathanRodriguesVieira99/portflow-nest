export interface TerminalValidationRequest {
  terminalId: string;
  cargoType: string;
}

export interface TerminalValidationResponse {
  terminalId: string;
  exists: boolean;
  isActive: boolean;
  isCargoTypeAccepted: boolean;
  availableCapacity: boolean;
  isTerminalValid: boolean;
  message: string;
}
