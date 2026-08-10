import { Inject, Injectable } from '@nestjs/common';
import { ok } from '@/@types/result';
import type { Result } from '@/@types/result';
import {
  CONTAINER_REPOSITORY_CONTRACT,
  type PrismaContainerRepositoryContract,
} from '@/application/repositories/prisma/prisma-container.repository.contract';

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
