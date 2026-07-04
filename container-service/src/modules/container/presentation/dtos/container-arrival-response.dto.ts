import type { StatusContainer } from '../../domain/types/status-container.type';

export interface ContainerArrivalResponseDto {
  shipId: string;
  terminalId: string;
  originCountry: string;
  destinationCountry: string;
  cargoType: string;
  statusContainer: StatusContainer;
  arrivalDate: Date;
}
