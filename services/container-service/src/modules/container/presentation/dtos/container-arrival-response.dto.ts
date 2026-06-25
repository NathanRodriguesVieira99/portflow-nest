import type { StatusContainer } from '@/modules/container/domain/enums/status-container.enum';

export interface ContainerArrivalResponseDto {
  shipId: string;
  terminalId: string;
  originCountry: string;
  destinationCountry: string;
  cargoType: string;
  statusContainer: StatusContainer;
  arrivalDate: Date;
}
