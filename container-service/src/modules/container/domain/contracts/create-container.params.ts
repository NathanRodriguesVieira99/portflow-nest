import type { StatusContainer } from '../types/status-container.type';

export interface CreateContainerParams {
  id?: string;
  shipId: string;
  terminalId: string;
  originCountry: string;
  destinationCountry: string;
  cargoType: string;
  status: StatusContainer;
  arrivalDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
