import { randomUUID } from 'node:crypto';
import { ContainerDomainException } from '../exceptions/container.exceptions';
import { validateContainerStatus } from './validate-container-status';
import { validateNonEmptyString } from './validate-non-empty-string';
import type { StatusContainer } from '@/domain/types/status-container.type';

export namespace CreateContainer {
  export type Input = {
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
  };
}

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
    if (!validateNonEmptyString(id)) {
      throw new ContainerDomainException('Invalid Container');
    }
    if (!validateNonEmptyString(shipId)) {
      throw new ContainerDomainException('Invalid Ship');
    }
    if (!validateNonEmptyString(terminalId)) {
      throw new ContainerDomainException('Invalid Terminal');
    }
    if (!validateContainerStatus(status)) {
      throw new ContainerDomainException('Invalid status');
    }
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
  }: CreateContainer.Input): Container {
    const now = new Date();

    /**
     * Este método cria uma nova entidade.
     */
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

  /**
   * Este método reconstrói a entidade a partir de dados vindos do banco.
   */
  static restore({
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
  }: CreateContainer.Input): Container {
    return new Container(
      id!,
      shipId,
      terminalId,
      originCountry,
      destinationCountry,
      cargoType,
      status,
      arrivalDate,
      createdAt!,
      updatedAt!,
    );
  }

  validateArrival(): void {
    if (this.status !== 'PENDING_DOCUMENTATION') {
      throw new ContainerDomainException(
        'Container is not awaiting documentation',
      );
    }

    if (!this.arrivalDate) {
      throw new ContainerDomainException('Arrival date is required');
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
