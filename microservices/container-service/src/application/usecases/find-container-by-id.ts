import { Inject } from '@nestjs/common';
import { Container } from '@/domain/entities/container.entity';
import { ok } from '@/@types/result';
import type { Result } from '@/@types/result';
import {
  CONTAINER_REPOSITORY_CONTRACT,
  type PrismaContainerRepositoryContract,
} from '@/application/repositories/prisma/prisma-container.repository.contract';

export class FindContainerByIdUseCase {
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
