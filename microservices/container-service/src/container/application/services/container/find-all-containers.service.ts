import { Inject, Injectable } from '@nestjs/common';
import {
  CONTAINER_REPOSITORY_CONTRACT,
  type PrismaContainerRepositoryContract,
} from '@Infra/persistence/repositories/prisma/prisma-container.repository.contract';
import { Container } from '@Models/container.model';
import { ok } from '@Shared/result';

import type { Result } from '@Shared/result';
import type { Pagination } from '@/container/domain/contracts/pagination';

@Injectable()
export class FindAllContainersService {
  constructor(
    @Inject(CONTAINER_REPOSITORY_CONTRACT)
    private readonly repo: PrismaContainerRepositoryContract,
  ) {}

  async execute(
    queryParams: Pagination.Input,
  ): Promise<Result<Pagination.Output<Container>>> {
    const containers = await this.repo.findAll(queryParams);
    if (!containers.ok) return containers;
    return ok(containers.value);
  }
}
