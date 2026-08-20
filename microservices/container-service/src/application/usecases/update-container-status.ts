import { Inject, Injectable } from '@nestjs/common';
import { Container } from '@/domain/entities/container.entity';
import { badRequest } from '../exceptions/http-exceptions';
import { err, ok } from '@/@types/result';
import {
  CONTAINER_REPOSITORY_CONTRACT,
  type PrismaContainerRepositoryContract,
} from '@/application/repositories/prisma/prisma-container.repository.contract';

import type { Result } from '@/@types/result';
import type { StatusContainer } from '@/@types/status-container.type';

export namespace UpdateContainerStatus {
  export type Input = {
    containerId: string;
    newStatus: StatusContainer;
  };
}

@Injectable()
export class UpdateContainerStatusUseCase {
  constructor(
    @Inject(CONTAINER_REPOSITORY_CONTRACT)
    private readonly repo: PrismaContainerRepositoryContract,
  ) {}

  async execute({
    containerId,
    newStatus,
  }: UpdateContainerStatus.Input): Promise<Result<Container>> {
    const container = await this.repo.findById(containerId); // ? Talvez usar uma transaction do prisma

    if (!container.ok) return container;

    const containerOnDatabase = container.value;

    try {
      containerOnDatabase.updateStatus(newStatus);
    } catch {
      return err(badRequest('Invalid status transition'));
    }

    const updatedContainer = await this.repo.update(containerOnDatabase);

    if (!updatedContainer.ok) return updatedContainer;

    return ok(updatedContainer.value);
  }
}
