import { Inject, Injectable } from '@nestjs/common';
import { Container } from '@Models/container.model';
import { badRequest } from '@/container/application/exceptions';
import { err, ok } from '@Shared/result';
import {
  CONTAINER_REPOSITORY_CONTRACT,
  type ContainerRepositoryContract,
} from '@Infra/persistence/repositories/prisma/container.repository.contract';

import type { Result } from '@Shared/result';
import type { StatusContainer } from '@Types/status-container.type';

export namespace UpdateContainerStatus {
  export type Input = {
    containerId: string;
    newStatus: StatusContainer;
  };
}

@Injectable()
export class UpdateContainerStatusService {
  constructor(
    @Inject(CONTAINER_REPOSITORY_CONTRACT)
    private readonly repo: ContainerRepositoryContract,
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
