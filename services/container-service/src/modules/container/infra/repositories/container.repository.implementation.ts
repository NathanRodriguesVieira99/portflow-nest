import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../infrastructure/database/prisma/prisma.service';

import { ContainerRepositoryContract } from '../../domain/repositories/container.repository.contract';

import type { Container } from '../../domain/models/container.model';
import type { StatusContainer } from '../../@types/status-container';
import type { Result } from '../../../../shared/errors/result';
import type { ContainerArrivalRequestDto } from '../../presentation/dtos/container-arrival-request.dto';
import type { ContainerArrivalResponseDto } from '../../presentation/dtos/container-arrival-response.dto';
import type { UpdateContainerStatusDto } from '../../presentation/dtos/update-container-status.dto';

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
  }: ContainerArrivalRequestDto): Promise<
    Result<ContainerArrivalResponseDto>
  > {}

  async findAllContainers(): Promise<Result<Container[]>> {}

  async findContainerById(containerId: string): Promise<Result<Container>> {}

  async findStatusById(containerId: string): Promise<Result<StatusContainer>> {}

  async updateContainerStatus({
    containerId,
    newStatus,
  }: UpdateContainerStatusDto): Promise<Result<Container>> {}
}
