import { randomUUID } from 'node:crypto';

import type { StatusContainer } from '../types/status-container.type';
import type { CreateContainerParams } from '../contracts/create-container.params';

export class Container {
  private constructor(
    private id: string,
    private shipId: string,
    private terminalId: string,
    private originCountry: string,
    private destinationCountry: string,
    private cargoType: string,
    private status: StatusContainer,
    private arrivalDate: Date,
    private createdAt: Date,
    private updatedAt: Date,
  ) {}

  static create({
    id,
    shipId,
    terminalId,
    originCountry,
    destinationCountry,
    cargoType,
    status,
    arrivalDate,
    createdAt,
    updatedAt,
  }: CreateContainerParams): Container {
    const now = new Date();

    return new Container(
      id ?? randomUUID(),
      shipId,
      terminalId,
      originCountry,
      destinationCountry,
      cargoType,
      status,
      arrivalDate,
      createdAt ?? now,
      updatedAt ?? now,
    );
  }

  getId() {
    return this.id;
  }

  getShipId() {
    return this.shipId;
  }

  getTerminalId() {
    return this.terminalId;
  }

  getOriginCountry() {
    return this.originCountry;
  }

  getDestinationCountry() {
    return this.destinationCountry;
  }

  getCargoType() {
    return this.cargoType;
  }

  getStatus() {
    return this.status;
  }

  getArrivalDate() {
    return this.arrivalDate;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }
}
