import { StatusContainer } from '../enums/status-container.enum';

export interface IContainer {
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

export class Container {
  public readonly id?: string;
  public readonly shipId!: string;
  public readonly terminalId!: string;
  public readonly originCountry!: string;
  public readonly destinationCountry!: string;
  public readonly cargoType!: string;
  public readonly status!: StatusContainer;
  public readonly arrivalDate!: Date;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(data: IContainer) {
    Object.assign(this, data);
  }
}
