import type { StatusContainer } from '@/modules/container/@types/status-container';

export interface ContainerArrivalResponseDto {
  shipId: string;
  terminalId: string;
  originCountry: string;
  destinationCountry: string;
  cargoType: string;
  statusContainer: StatusContainer;
  arrivalDate: Date;
}
