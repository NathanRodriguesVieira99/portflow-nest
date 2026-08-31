import { Inject, Injectable } from '@nestjs/common';
import {
  CONTAINER_REPOSITORY_CONTRACT,
  type ContainerRepositoryContract,
} from '@/application/repositories/container.repository.contract';
import { ok, type Result } from '@/domain/types/result';
import type { UseCase } from '../use-case';

export namespace RemoveContainer {
  export type Input = { containerId: string };
  export type Output = Result<string>;
}

@Injectable()
export class RemoveContainerUseCase implements UseCase<
  RemoveContainer.Input,
  RemoveContainer.Output
> {
  constructor(
    @Inject(CONTAINER_REPOSITORY_CONTRACT)
    private readonly repo: ContainerRepositoryContract,
  ) {}

  async execute({
    containerId,
  }: RemoveContainer.Input): Promise<RemoveContainer.Output> {
    const result = await this.repo.remove(containerId);
    if (!result.ok) return result;
    return ok(result.value);
  }
}
