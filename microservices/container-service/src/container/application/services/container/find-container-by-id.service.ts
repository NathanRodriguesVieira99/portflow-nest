import { Inject } from '@nestjs/common';
import {
  CONTAINER_REPOSITORY_CONTRACT,
  type PrismaContainerRepositoryContract,
} from '@Infra/persistence/repositories/prisma/prisma-container.repository.contract';
import { Container } from '@Models/container.model';
import { ok } from '@Shared/result';

import type { Result } from '@Shared/result';

export class FindContainerByIdService {
  constructor(
    @Inject(CONTAINER_REPOSITORY_CONTRACT)
    private readonly repo: PrismaContainerRepositoryContract,
  ) {}

  async execute(containerId: string): Promise<Result<Container>> {
    const container = await this.repo.findById(containerId);
    if (!container.ok) return container;
    return ok(container.value);
  }
}
