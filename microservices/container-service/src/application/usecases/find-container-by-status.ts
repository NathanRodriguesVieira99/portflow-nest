import { Inject, Injectable } from '@nestjs/common';
import { Container } from '@/domain/entities/container.entity';
import { ok } from '@/@types/result';
import type { Pagination } from '@/@types/pagination';
import type { Result } from '@/@types/result';
import type { StatusContainer } from '@/@types/status-container.type';
import {
  CONTAINER_REPOSITORY_CONTRACT,
  type PrismaContainerRepositoryContract,
} from '@/application/repositories/prisma/prisma-container.repository.contract';

@Injectable()
export class FindContainerByStatusService {
  constructor(
    @Inject(CONTAINER_REPOSITORY_CONTRACT)
    private readonly repo: PrismaContainerRepositoryContract,
  ) {}

  async execute(
    queryParams: Pagination.Input,
    status: StatusContainer,
  ): Promise<Result<Pagination.Output<Container>>> {
    const containers = await this.repo.findByStatus(queryParams, status);
    if (!containers.ok) return containers;
    return ok(containers.value);
  }
}
