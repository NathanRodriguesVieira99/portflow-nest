import type { StatusContainer } from '../../@types/status-container.type';

export interface ContainerArrivalResponseDto {
  shipId: string;
  terminalId: string;
  originCountry: string;
  destinationCountry: string;
  cargoType: string;
  statusContainer: StatusContainer;
  arrivalDate: Date;
}
