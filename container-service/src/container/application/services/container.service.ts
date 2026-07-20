import { Injectable, Logger } from '@nestjs/common';
import { TerminalService } from './terminal.service';
import { ContainerProducer } from '@Infra/messaging/kafka/container.producer';
import { ContainerRepositoryContract } from '@Infra/repositories/prisma/container.repository.contract';
import { Container } from '@Models/container.model';
import { badRequest, unauthorized } from '@Shared/exceptions';
import { err, ok } from '@Shared/result';

import type { Result } from '@Shared/result';
import type { StatusContainer } from '@Types/status-container.type';
import type { ContainerArrivalInput } from '@Contracts/container-arrival.input';
import type { ContainerArrivalOutput } from '@Contracts/container-arrival.output';
import type { PaginationInput } from '@Contracts/pagination.input';
import type { UpdateContainerStatusInput } from '@Contracts/update-container-status.input';
import type { PaginationOutput } from '@Contracts/pagination.output';

@Injectable()
export class ContainerService {
  private readonly logger = new Logger(ContainerService.name);

  constructor(
    private readonly repo: ContainerRepositoryContract,
    private readonly terminal: TerminalService,
    private readonly kafka: ContainerProducer,
  ) {}

  async registerContainerArrival({
    containerId,
    shipId,
    terminalId,
    originCountry,
    destinationCountry,
    cargoType,
  }: ContainerArrivalInput): Promise<Result<ContainerArrivalOutput>> {
    const terminalValidation = await this.terminal.validateTerminal({
      terminalId,
      cargoType,
    });

    if (!terminalValidation.ok) {
      const error = unauthorized(`Container is unauthorized to proceed!`);
      this.logger.warn(error.message);
      return err(error);
    }

    const container = Container.create({
      id: containerId,
      shipId,
      terminalId,
      originCountry,
      destinationCountry,
      cargoType,
      status: 'PENDING_DOCUMENTATION',
      arrivalDate: new Date(),
    });

    try {
      container.validateArrival();
      this.logger.log(
        `Container ${container.getId()} arrived at terminal ${container.getTerminalId()}`,
      );
    } catch {
      const error = badRequest('Invalid container arrival');
      this.logger.warn(error.message);
      return err(error);
    }

    const saved = await this.repo.save(container);

    if (!saved.ok) return saved;

    await this.kafka.sendPendingDocumentationEvent(saved.value.getId());

    return ok({
      containerId: saved.value.getId(),
      shipId: saved.value.getShipId(),
      terminalId: saved.value.getTerminalId(),
      originCountry: saved.value.getOriginCountry(),
      destinationCountry: saved.value.getDestinationCountry(),
      cargoType: saved.value.getCargoType(),
      arrivalDate: saved.value.getArrivalDate(),
      statusContainer: saved.value.getStatus(),
    });
  }

  async remove(containerId: string): Promise<Result<string>> {
    const container = await this.repo.remove(containerId);
    if (!container.ok) return container;
    return ok(container.value);
  }

  async findById(containerId: string): Promise<Result<Container>> {
    const container = await this.repo.findById(containerId);
    if (!container.ok) return container;
    return ok(container.value);
  }

  async findAll(
    queryParams: PaginationInput,
  ): Promise<Result<PaginationOutput<Container>>> {
    const containers = await this.repo.findAll(queryParams);
    if (!containers.ok) return containers;
    return ok(containers.value);
  }

  async findByStatus(
    queryParams: PaginationInput,
    status: StatusContainer,
  ): Promise<Result<PaginationOutput<Container | undefined>>> {
    const containers = await this.repo.findByStatus(queryParams, status);
    if (!containers.ok) return containers;
    return ok(containers.value);
  }

  async updateStatus({
    containerId,
    newStatus,
  }: UpdateContainerStatusInput): Promise<Result<Container>> {
    const containerResult = await this.repo.findById(containerId);

    if (!containerResult.ok) return containerResult;

    const container = containerResult.value;

    try {
      container.updateStatus(newStatus);
    } catch {
      return err(badRequest('Invalid status transition'));
    }

    const saved = await this.repo.save(container);

    if (!saved.ok) return saved;

    return ok(saved.value);
  }
}
