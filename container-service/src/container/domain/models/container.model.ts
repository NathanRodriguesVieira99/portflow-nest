import { randomUUID } from 'node:crypto';
import { ContainerError } from '../errors/container.model.errors';
import {
  validateContainerId,
  validateShipId,
  validateTerminalId,
} from '@Shared/utils/container.model.validations';

import type { StatusContainer } from '@Types/status-container.type';
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
  ) {
    if (!validateContainerId) throw new ContainerError('Invalid Container');
    if (!validateShipId) throw new ContainerError('Invalid Ship');
    if (!validateTerminalId) throw new ContainerError('Invalid Terminal');
  }

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

  validateArrival(): void {
    if (this.status !== 'PENDING_DOCUMENTATION') {
      throw new ContainerError('Container is not awaiting documentation');
    }

    if (!this.arrivalDate) {
      throw new ContainerError('Arrival date is required');
    }
  }

  updateStatus(newStatus: StatusContainer): void {
    if (this.status === newStatus) return;
    this.status = newStatus;
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
