import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/database/prisma/prisma.service';
import { ContainerRepositoryContract } from '../../domain/repositories/container.repository.contract';

import type { Container } from '../../domain/models/container.model';
import type { Result } from '../../../../shared/errors/result';
import type { StatusContainer } from '../../domain/types/status-container.type';
import type { ContainerArrivalInput } from '../../domain/contracts/container-arrival.input';
import type { ContainerArrivalOutput } from '../../domain/contracts/container-arrival.output';
import type { UpdateContainerStatusInput } from '../../domain/contracts/update-container-status.input';
import type { PaginationOutput } from '../../domain/contracts/pagination.output';
import type { PaginationInput } from '../../domain/contracts/pagination.input';

@Injectable()
export class ContainerRepositoryImplementation implements ContainerRepositoryContract {
  constructor(private readonly prisma: PrismaService) {}

  async registerContainerArrival({
    containerId,
    shipId,
    terminalId,
    originCountry,
    destinationCountry,
    cargoType,
  }: ContainerArrivalInput): Promise<Result<ContainerArrivalOutput>> {}

  async findAllContainers({
    page,
    perPage,
  }: PaginationInput): Promise<Result<PaginationOutput<Container>>> {}

  async findContainerById(containerId: string): Promise<Result<Container>> {}

  async findContainerByStatus(
    containerId: string,
  ): Promise<Result<StatusContainer>> {}

  async updateContainerStatus({
    containerId,
    newStatus,
  }: UpdateContainerStatusInput): Promise<Result<Container>> {}
}
