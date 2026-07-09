import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/database/prisma/prisma.service';
import { Container } from '../../domain/models/container.model';
import { ContainerRepositoryContract } from '../../domain/repositories/container.repository.contract';
import { PrismaContainerMapper } from '../mappers/prisma/container.mapper';
import { err, ok } from '../../../../shared/errors/result';
import {
  badRequest,
  conflict,
  databaseError,
  notFound,
} from '../../../../shared/errors/exceptions/exceptions';

import type { Result } from '../../../../shared/errors/result';
import type { ContainerArrivalInput } from '../../domain/contracts/container-arrival.input';
import type { ContainerArrivalOutput } from '../../domain/contracts/container-arrival.output';
import type { PaginationOutput } from '../../domain/contracts/pagination.output';
import type { UpdateContainerStatusInput } from '../../domain/contracts/update-container-status.input';
import type { PaginationInput } from '../../domain/contracts/pagination.input';
import type { StatusContainer } from '../../domain/types/status-container.type';

@Injectable()
export class ContainerRepositoryImplementation implements ContainerRepositoryContract {
  private readonly logger = new Logger(ContainerRepositoryImplementation.name);

  constructor(private readonly prisma: PrismaService) {}

  async registerContainerArrival({
    containerId,
    shipId,
    terminalId,
    originCountry,
    destinationCountry,
    cargoType,
  }: ContainerArrivalInput): Promise<Result<ContainerArrivalOutput>> {
    try {
      const containerAlreadyArrived = await this.prisma.container.findUnique({
        where: { id: containerId },
      });

      if (containerAlreadyArrived) {
        const error = conflict('Container already arrived!');
        this.logger.warn(error.message);
        return err(error);
      }

      const container = await this.prisma.container.create({
        data: {
          id: containerId,
          shipId,
          terminalId,
          originCountry,
          destinationCountry,
          cargoType,
          statusContainer: 'PENDING_DOCUMENTATION',
          arrivalDate: new Date(),
        },
      });

      if (container.statusContainer !== 'PENDING_DOCUMENTATION') {
        const error = badRequest('This container cannot be released!');
        this.logger.warn(error.message);
        return err(error);
      }

      return ok({
        containerId: container.id,
        shipId: container.shipId,
        terminalId: container.terminalId,
        originCountry: container.originCountry,
        destinationCountry: container.destinationCountry,
        cargoType: container.cargoType,
        arrivalDate: container.arrivalDate,
        statusContainer: container.statusContainer,
      });
    } catch {
      const error = databaseError('Failed to register container arrival');
      this.logger.error(error.message);
      return err(error);
    }
  }

  async findContainerById(containerId: string): Promise<Result<Container>> {
    try {
      const raw = await this.prisma.container.findUnique({
        where: { id: containerId },
      });

      if (!raw) {
        const error = notFound('Container');
        this.logger.warn(error.message);
        return err(error);
      }

      return ok(PrismaContainerMapper.toDomain(raw));
    } catch {
      const error = databaseError('Failed to find container');
      this.logger.error(error.message);
      return err(error);
    }
  }

  async findAllContainers(
    queryParams: PaginationInput,
  ): Promise<Result<PaginationOutput<Container>>> {
    const { page = 1, perPage = 10 } = queryParams;

    const take = Number(perPage);
    const skip = Number((page - 1) * take);
    try {
      const [containers, totalContainers] = await this.prisma.$transaction(
        async (tx) => {
          const containers = await tx.container.findMany({
            take,
            skip,
            orderBy: { createdAt: 'asc' },
          });

          const totalContainers = await tx.container.count();

          return [containers, totalContainers];
        },
      );

      const totalPages = Math.ceil(totalContainers / take);
      const hasNextPage = Boolean(page * take < totalContainers);
      const hasPreviousPage = Boolean(page > 1);

      return ok({
        data: containers.map(PrismaContainerMapper.toDomain),
        meta: {
          totalItems: totalContainers,
          page: Number(page),
          perPage: Number(perPage),
          totalPages,
          hasNextPage,
          hasPreviousPage,
        },
      });
    } catch {
      const error = databaseError('Failed find containers');
      this.logger.error(error.message);
      return err(error);
    }
  }

  async findContainerByStatus(
    queryParams: PaginationInput,
    status: StatusContainer,
  ): Promise<Result<PaginationOutput<Container>>> {
    const { page = 1, perPage = 10 } = queryParams;

    const take = Number(perPage);
    const skip = Number((page - 1) * take);
    try {
      const [containers, totalContainers] = await this.prisma.$transaction(
        async (tx) => {
          const containers = await tx.container.findMany({
            take,
            skip,
            where: { statusContainer: status },
            orderBy: { createdAt: 'asc' },
          });

          const totalContainers = await tx.container.count();

          return [containers, totalContainers];
        },
      );

      const totalPages = Math.ceil(totalContainers / take);
      const hasNextPage = Boolean(page * take < totalContainers);
      const hasPreviousPage = Boolean(page > 1);

      return ok({
        data: containers.map(PrismaContainerMapper.toDomain),
        meta: {
          totalItems: totalContainers,
          page: Number(page),
          perPage: Number(perPage),
          totalPages,
          hasNextPage,
          hasPreviousPage,
        },
      });
    } catch {
      const error = databaseError('Failed find containers');
      this.logger.error(error.message);
      return err(error);
    }
  }

  async updateContainerStatus({
    containerId,
    newStatus,
  }: UpdateContainerStatusInput): Promise<Result<Container>> {
    try {
      const raw = await this.prisma.container.update({
        where: { id: containerId },
        data: { statusContainer: newStatus },
      });

      if (!raw) {
        const error = notFound('Container');
        this.logger.warn(error.message);
        return err(error);
      }

      return ok(PrismaContainerMapper.toDomain(raw));
    } catch {
      const error = databaseError('Failed to update container status');
      this.logger.error(error.message);
      return err(error);
    }
  }
}
