import { Inject, Injectable } from '@nestjs/common';
import {
  CONTAINER_REPOSITORY_CONTRACT,
  type PrismaContainerRepositoryContract,
} from '@Infra/persistence/repositories/prisma/prisma-container.repository.contract';
import { ok } from '@Shared/result';

import type { Result } from '@Shared/result';

@Injectable()
export class RemoveContainerService {
  constructor(
    @Inject(CONTAINER_REPOSITORY_CONTRACT)
    private readonly repo: PrismaContainerRepositoryContract,
  ) {}

  async execute(containerId: string): Promise<Result<string>> {
    const container = await this.repo.remove(containerId);
    if (!container.ok) return container;
    return ok(container.value);
  }
}
