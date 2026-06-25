import { StatusContainer } from '../enums/status-container.enum';

interface IContainer {
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
  private id?: string | undefined;
  private shipId!: string;
  private terminalId!: string;
  private originCountry!: string;
  private destinationCountry!: string;
  private cargoType!: string;
  private status!: StatusContainer;
  private arrivalDate!: Date;
  private readonly createdAt?: Date | undefined;
  private readonly updatedAt?: Date | undefined;

  constructor(container: Partial<IContainer>) {
    Object.assign(this, container);
  }

  public getId(): string | undefined {
    return this.id;
  }

  public getShipId(): string {
    return this.shipId;
  }

  public getTerminalId(): string {
    return this.terminalId;
  }

  public getOriginCountry(): string {
    return this.originCountry;
  }

  public getDestinationCountry(): string {
    return this.destinationCountry;
  }

  public getCargoType(): string {
    return this.cargoType;
  }

  public getStatus(): StatusContainer {
    return this.status;
  }

  public getArrivalDate(): Date {
    return this.arrivalDate;
  }

  public getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  public getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }
}
