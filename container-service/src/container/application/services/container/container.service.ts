import { Injectable, Logger } from '@nestjs/common';
import { TerminalService } from '../terminal/terminal.service';
import { SendPendingDocumentationEvent } from '@/container/infrastructure/messaging/events/producers/send-pending-documentation.event';
import { ContainerRepositoryContract } from '@Infra/persistence/repositories/prisma/container.repository.contract';
import { Container } from '@Models/container.model';
import { badRequest, unauthorized } from '@/container/application/exceptions';
import { err, ok } from '@Shared/result';

import type { Result } from '@Shared/result';
import type { StatusContainer } from '@Types/status-container.type';
import type { ContainerArrivalInput } from '@/container/application/contracts/container-arrival.input';
import type { ContainerArrivalOutput } from '@/container/application/contracts/container-arrival.output';
import type { PaginationInput } from '@/container/application/contracts/pagination.input';
import type { UpdateContainerStatusInput } from '@/container/application/contracts/update-container-status.input';
import type { PaginationOutput } from '@/container/application/contracts/pagination.output';

@Injectable()
export class ContainerService {
  private readonly logger = new Logger(ContainerService.name);

  constructor(
    private readonly repo: ContainerRepositoryContract,
    private readonly terminal: TerminalService,
    private readonly kafka: SendPendingDocumentationEvent,
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

    await this.kafka.sendPendingDocumentation(saved.value.getId());

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
    const containerResult = await this.repo.findById(containerId); // ? Talvez usar uma transaction do prisma

    if (!containerResult.ok) return containerResult;

    const container = containerResult.value;

    try {
      container.updateStatus(newStatus);
    } catch {
      return err(badRequest('Invalid status transition'));
    }

    const saved = await this.repo.save(container); //! Corrigir erro 500 ao salvar o container (provavelmente criar um método update no repo)

    if (!saved.ok) return saved;

    return ok(saved.value);
  }
}
