import { Injectable } from '@nestjs/common';
import {
  conflict,
  internalServerError,
  notFound,
} from '@/application/exceptions/exceptions';
import { Container } from '@/domain/entities/container.entity';
import { err, ok, type Result } from '@/domain/types/result';
import { PrismaService } from '../../database/prisma/prisma.service';
import { PrismaContainerMapper } from '../../mappers/prisma/prisma-container.mapper';
import type { Pagination } from '@/domain/types/pagination';
import type { StatusContainer } from '@/domain/types/status-container.type';
import type { ContainerRepositoryContract } from '@/application/repositories/container.repository.contract';

@Injectable()
export class PrismaContainerRepositoryImplementation implements ContainerRepositoryContract {
  constructor(private readonly prisma: PrismaService) {}

  async save(container: Container): Promise<Result<Container>> {
    try {
      const raw = PrismaContainerMapper.toPrisma(container);
      const savedContainer = await this.prisma.container.create({
        data: raw,
      });
      return ok(PrismaContainerMapper.toDomain(savedContainer));
    } catch {
      return err(internalServerError('Failed to save container'));
    }
  }

  async update(container: Container): Promise<Result<Container>> {
    try {
      const raw = PrismaContainerMapper.toPrisma(container);
      const updatedContainer = await this.prisma.container.update({
        where: { id: raw.id },
        data: raw,
      });
      return ok(PrismaContainerMapper.toDomain(updatedContainer));
    } catch {
      return err(internalServerError('Failed to update container'));
    }
  }

  async remove(containerId: string): Promise<Result<string>> {
    try {
      const containerExists = await this.prisma.container.findUnique({
        where: { id: containerId },
      });

      if (!containerExists) return err(notFound('Container'));

      await this.prisma.container.delete({ where: { id: containerId } });

      return ok(`Container ${containerId} removed!`);
    } catch {
      return err(conflict('Invalid deletion request!'));
    }
  }

  async findById(containerId: string): Promise<Result<Container>> {
    try {
      const containerExists = await this.prisma.container.findUnique({
        where: { id: containerId },
      });
      if (!containerExists) {
        return err(notFound('Container'));
      }
      return ok(PrismaContainerMapper.toDomain(containerExists));
    } catch {
      return err(internalServerError('Failed to find container'));
    }
  }

  async findAll(
    queryParams: Pagination.Input,
  ): Promise<Result<Pagination.Output<Container>>> {
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
      return err(internalServerError('Failed find containers'));
    }
  }

  async findByStatus(
    queryParams: Pagination.Input,
    statusContainer: StatusContainer,
  ): Promise<Result<Pagination.Output<Container>>> {
    const { page = 1, perPage = 10 } = queryParams;

    const take = Number(perPage);
    const skip = Number((page - 1) * take);

    try {
      const [containers, totalItems] = await this.prisma.$transaction(
        async (tx) => {
          const containers = await tx.container.findMany({
            take,
            skip,
            where: { statusContainer },
            orderBy: { createdAt: 'asc' },
          });

          const totalItems = await tx.container.count({
            where: { statusContainer },
          });

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
      return err(internalServerError('Failed find containers'));
    }
  }
}
