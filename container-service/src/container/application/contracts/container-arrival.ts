import type { StatusContainer } from '@Types/status-container.type';

export interface ContainerArrivalInput {
  containerId: string;
  shipId: string;
  terminalId: string;
  originCountry: string;
  destinationCountry: string;
  cargoType: string;
}

export interface ContainerArrivalOutput {
  containerId: string;
  shipId: string;
  terminalId: string;
  originCountry: string;
  destinationCountry: string;
  cargoType: string;
  statusContainer: StatusContainer;
  arrivalDate: Date;
}
