import type { ContainerContract } from '../contracts/container.contract';
import type { StatusContainer } from '../../@types/status-container.type';

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

  constructor(data: ContainerContract) {
    Object.assign(this, data);
  }
}
