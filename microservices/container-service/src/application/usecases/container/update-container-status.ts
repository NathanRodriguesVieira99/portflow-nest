import { Inject, Injectable } from '@nestjs/common';
import { badRequest } from '@/application/exceptions/exceptions';
import {
  CONTAINER_REPOSITORY_CONTRACT,
  type ContainerRepositoryContract,
} from '@/application/repositories/container.repository.contract';
import { Container } from '@/domain/entities/container.entity';
import { err, ok, type Result } from '@/domain/types/result';
import type { StatusContainer } from '@/domain/types/status-container.type';
import type { UseCase } from '../use-case';

export namespace UpdateContainerStatus {
  export type Input = {
    containerId: string;
    newStatus: StatusContainer;
  };
  export type Output = Result<Container>;
}

@Injectable()
export class UpdateContainerStatusUseCase implements UseCase<
  UpdateContainerStatus.Input,
  UpdateContainerStatus.Output
> {
  constructor(
    @Inject(CONTAINER_REPOSITORY_CONTRACT)
    private readonly repo: ContainerRepositoryContract,
  ) {}

  async execute({
    containerId,
    newStatus,
  }: UpdateContainerStatus.Input): Promise<UpdateContainerStatus.Output> {
    const findResult = await this.repo.findById(containerId);

    if (!findResult.ok) return findResult;

    const containerOnDatabase = findResult.value;

    try {
      containerOnDatabase.updateStatus(newStatus);
    } catch {
      return err(badRequest('INVALID_STATUS_TRANSITION'));
    }

    const updateResult = await this.repo.update(containerOnDatabase);

    if (!updateResult.ok) return updateResult;

    return ok(updateResult.value);
  }
}
