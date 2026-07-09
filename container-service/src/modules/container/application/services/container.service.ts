import { Injectable, Logger } from '@nestjs/common';
import { TerminalService } from './terminal.service';
import { ContainerProducer } from '../../infrastructure/events/container.producer';
import { ContainerRepositoryContract } from '../../domain/repositories/container.repository.contract';
import { Container } from '../../domain/models/container.model';
import { unauthorized } from '../../../../shared/errors/exceptions/exceptions';
import { err, ok } from '../../../../shared/errors/result';

import type { Result } from '../../../../shared/errors/result';
import type { ContainerArrivalInput } from '../../domain/contracts/container-arrival.input';
import type { ContainerArrivalOutput } from '../../domain/contracts/container-arrival.output';
import type { PaginationInput } from '../../domain/contracts/pagination.input';
import type { PaginationOutput } from '../../domain/contracts/pagination.output';
import type { StatusContainer } from '../../domain/types/status-container.type';
import type { UpdateContainerStatusInput } from '../../domain/contracts/update-container-status.input';

@Injectable()
export class ContainerService {
  private readonly logger = new Logger(ContainerService.name);

  constructor(
    private readonly repo: ContainerRepositoryContract,
    private readonly terminal: TerminalService,
    private readonly kafka: ContainerProducer,
  ) {}

  async registerContainerArrival(
    input: ContainerArrivalInput,
  ): Promise<Result<ContainerArrivalOutput>> {
    const terminalValidation = await this.terminal.validateTerminal({
      terminalId: input.terminalId,
      cargoType: input.cargoType,
    });

    if (!terminalValidation.ok) {
      const error = unauthorized(`Container is unauthorized to proceed!`);
      this.logger.warn(error.message);
      return err(error);
    }

    const request = await this.repo.registerContainerArrival({
      containerId: input.containerId,
      shipId: input.shipId,
      terminalId: input.terminalId,
      originCountry: input.originCountry,
      destinationCountry: input.destinationCountry,
      cargoType: input.cargoType,
    });

    if (!request.ok) return request;

    await this.kafka.sendPendingDocumentationEvent(request.value.containerId);

    this.logger.log(
      `Container ${request.value.containerId} arrived at terminal ${request.value.terminalId}`,
    );

    return ok(request.value);
  }

  async findContainerById(containerId: string): Promise<Result<Container>> {
    const request = await this.repo.findContainerById(containerId);
    if (!request.ok) return request;
    return ok(request.value);
  }

  async findAllContainers(
    queryParams: PaginationInput,
  ): Promise<Result<PaginationOutput<Container>>> {
    const result = await this.repo.findAllContainers(queryParams);
    if (!result.ok) return result;
    return ok(result.value);
  }

  async findContainerByStatus(
    queryParams: PaginationInput,
    status: StatusContainer,
  ): Promise<Result<PaginationOutput<Container>>> {
    const result = await this.repo.findContainerByStatus(queryParams, status);
    if (!result.ok) return result;
    return ok(result.value);
  }

  async updateContainerStatus(
    input: UpdateContainerStatusInput,
  ): Promise<Result<Container>> {
    const result = await this.repo.updateContainerStatus({
      containerId: input.containerId,
      newStatus: input.newStatus,
    });
    if (!result.ok) return result;
    return ok(result.value);
  }
}
