import { StatusContainer } from '../../@types/status-container';

import type { IContainer } from '../interfaces/container.interface';

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
