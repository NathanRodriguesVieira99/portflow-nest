import type { StatusContainer } from '../types/status-container.type';

export interface ContainerArrivalOutput {
  shipId: string;
  terminalId: string;
  originCountry: string;
  destinationCountry: string;
  cargoType: string;
  statusContainer: StatusContainer;
  arrivalDate: Date;
}
