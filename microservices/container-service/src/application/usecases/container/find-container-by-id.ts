import { Inject } from '@nestjs/common';
import {
  CONTAINER_REPOSITORY_CONTRACT,
  type ContainerRepository,
} from '@/application/repositories/container.repository';
import { ok, type Result } from '@/domain/types/result';
import type { Container } from '@/domain/entities/container.entity';
import type { UseCase } from '../use-case';

export namespace FindContainerById {
  export type Input = { containerId: string };
  export type Output = Result<Container>;
}

export class FindContainerByIdUseCase implements UseCase<
  FindContainerById.Input,
  FindContainerById.Output
> {
  constructor(
    @Inject(CONTAINER_REPOSITORY_CONTRACT)
    private readonly repo: ContainerRepository,
  ) {}

  async execute({
    containerId,
  }: FindContainerById.Input): Promise<FindContainerById.Output> {
    const result = await this.repo.findById(containerId);
    if (!result.ok) return result;
    return ok(result.value);
  }
}
