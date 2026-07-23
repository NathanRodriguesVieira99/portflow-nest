import { Injectable } from '@nestjs/common';
import { PrismaService } from '@Infra/persistence/database/prisma/prisma.service';
import { ContainerRepositoryContract } from './container.repository.contract';
import { PrismaContainerMapper } from '../../mappers/prisma/container.mapper';
import { Container } from '@Models/container.model';
import { ok, err } from '@Shared/result';
import {
  badRequest,
  databaseError,
  notFound,
} from '@/container/application/exceptions';

import type { Result } from '@Shared/result';
import type { PaginationInput } from '@/container/application/contracts/pagination.input';
import type { PaginationOutput } from '@/container/application/contracts/pagination.output';
import type { StatusContainer } from '@Types/status-container.type';

@Injectable()
export class ContainerRepositoryImplementation implements ContainerRepositoryContract {
  constructor(private readonly prisma: PrismaService) {}

  async save(container: Container): Promise<Result<Container>> {
    try {
      const raw = await this.prisma.container.create({
        data: PrismaContainerMapper.toPrisma(container),
      });
      return ok(PrismaContainerMapper.toDomain(raw));
    } catch {
      return err(databaseError('Failed to save container'));
    }
  }

  async remove(containerId: string): Promise<Result<string>> {
    try {
      const containerExists = await this.prisma.container.findUnique({
        where: { id: containerId },
      });

      if (!containerExists) return err(notFound('Container'));
      if (containerExists) {
        await this.prisma.container.delete({ where: { id: containerId } });
      }

      return ok(`Container ${containerId} removed!`);
    } catch {
      return err(badRequest('Invalid deletion request!'));
    }
  }

  async findById(containerId: string): Promise<Result<Container>> {
    try {
      const raw = await this.prisma.container.findUnique({
        where: { id: containerId },
      });

      if (!raw) {
        const error = notFound('Container');
        return err(error);
      }

      return ok(PrismaContainerMapper.toDomain(raw));
    } catch {
      return err(databaseError('Failed to find container'));
    }
  }

  async findAll(
    queryParams: PaginationInput,
  ): Promise<Result<PaginationOutput<Container>>> {
    const { page = 1, perPage = 10 } = queryParams;

    const take = Number(perPage);
    const skip = Number((page - 1) * take);

    try {
      const [containers, totalItems] = await this.prisma.$transaction(
        async (tx) => {
          const containers = await tx.container.findMany({
            take,
            skip,
            orderBy: { createdAt: 'asc' },
          });

          const totalItems = await tx.container.count();

          return [containers, totalItems];
        },
      );

      const data = containers.map(PrismaContainerMapper.toDomain);
      const totalPages = Math.ceil(totalItems / take);
      const hasNextPage = Boolean(page * take < totalItems);
      const hasPreviousPage = Boolean(page > 1);

      return ok({
        data,
        meta: {
          totalItems,
          page: Number(page),
          perPage: Number(perPage),
          totalPages,
          hasNextPage,
          hasPreviousPage,
        },
      });
    } catch {
      return err(databaseError('Failed find containers'));
    }
  }

  async findByStatus(
    queryParams: PaginationInput,
    status: StatusContainer,
  ): Promise<Result<PaginationOutput<Container | undefined>>> {
    const { page = 1, perPage = 10 } = queryParams;

    const take = Number(perPage);
    const skip = Number((page - 1) * take);

    try {
      const [containers, totalItems] = await this.prisma.$transaction(
        async (tx) => {
          const containers = await tx.container.findMany({
            take,
            skip,
            where: { statusContainer: status },
            orderBy: { createdAt: 'asc' },
          });

          const totalItems = await tx.container.count();

          return [containers, totalItems];
        },
      );

      const data = containers.map(PrismaContainerMapper.toDomain);
      const totalPages = Math.ceil(totalItems / take);
      const hasNextPage = Boolean(page * take < totalItems);
      const hasPreviousPage = Boolean(page > 1);

      return ok({
        data,
        meta: {
          totalItems,
          page: Number(page),
          perPage: Number(perPage),
          totalPages,
          hasNextPage,
          hasPreviousPage,
        },
      });
    } catch {
      return err(databaseError('Failed find containers'));
    }
  }
}
