/*
 * Este DAO é a implementação concreta do contrato conectando a abstração ao banco de dados real (nesse caso via Prisma ORM).
 * Executa operações reais no banco de dados.
 * Deve depender apenas de DTOs, nunca de entidades de Domain.
 */

import { Injectable } from '@nestjs/common';
import {
  conflict,
  internalServerError,
  notFound,
} from '@/application/exceptions/exceptions';
import { err, ok, type Result } from '@/domain/types/result';
import { PrismaService } from '../../database/prisma/prisma.service';
import { PrismaContainerMapper } from '../../mappers/prisma/prisma-container.mapper';
import type { Pagination } from '@/domain/types/pagination';
import type { ContainerDAO } from '@/infra/persistence/database/DAOs/container.dao';

@Injectable()
export class ContainerDAOPrisma implements ContainerDAO {
  constructor(private readonly prisma: PrismaService) {}

  async save(
    dto: ContainerDAO.SaveDTO,
  ): Promise<Result<ContainerDAO.ContainerDTO>> {
    try {
      const raw = PrismaContainerMapper.toPrisma(dto);
      const savedContainer = await this.prisma.container.create({
        data: raw,
      });
      return ok(PrismaContainerMapper.toDTO(savedContainer));
    } catch {
      return err(internalServerError('Failed to save container'));
    }
  }

  async update(
    dto: ContainerDAO.UpdateDTO,
  ): Promise<Result<ContainerDAO.ContainerDTO>> {
    try {
      const raw = PrismaContainerMapper.toPrisma(dto);
      const updatedContainer = await this.prisma.container.update({
        where: { id: raw.id },
        data: raw,
      });
      return ok(PrismaContainerMapper.toDTO(updatedContainer));
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

  async findById(
    containerId: string,
  ): Promise<Result<ContainerDAO.ContainerDTO>> {
    try {
      const containerExists = await this.prisma.container.findUnique({
        where: { id: containerId },
      });
      if (!containerExists) {
        return err(notFound('Container'));
      }
      return ok(PrismaContainerMapper.toDTO(containerExists));
    } catch {
      return err(internalServerError('Failed to find container'));
    }
  }

  async findAll({
    queryParams,
  }: ContainerDAO.FindAllDTO): Promise<
    Result<Pagination.Output<ContainerDAO.ContainerDTO>>
  > {
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

      const data = containers.map(PrismaContainerMapper.toDTO);
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

  async findByStatus({
    queryParams,
    status,
  }: ContainerDAO.FindByStatusDTO): Promise<
    Result<Pagination.Output<ContainerDAO.ContainerDTO>>
  > {
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

          const totalItems = await tx.container.count({
            where: { statusContainer: status },
          });

          return [containers, totalItems];
        },
      );

      const data = containers.map(PrismaContainerMapper.toDTO);
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
