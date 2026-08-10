import { Inject, Injectable } from '@nestjs/common';
import { Container } from '@/domain/entities/container.entity';
import { ok } from '@/@types/result';
import type { Result } from '@/@types/result';
import type { Pagination } from '@/@types/pagination';
import {
  CONTAINER_REPOSITORY_CONTRACT,
  type PrismaContainerRepositoryContract,
} from '@/application/repositories/prisma/prisma-container.repository.contract';

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
