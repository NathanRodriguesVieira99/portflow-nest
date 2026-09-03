import { Inject, Injectable } from '@nestjs/common';
import {
  CONTAINER_REPOSITORY_CONTRACT,
  type ContainerRepository,
} from '@/application/repositories/container.repository';
import { Container } from '@/domain/entities/container.entity';
import { ok, type Result } from '@/domain/types/result';
import type { Pagination } from '@/domain/types/pagination';
import type { UseCase } from '../use-case';

export namespace FindAllContainers {
  export type Input = Pagination.Input;
  export type Output = Result<Pagination.Output<Container>>;
}

@Injectable()
export class FindAllContainersUseCase implements UseCase<
  FindAllContainers.Input,
  FindAllContainers.Output
> {
  constructor(
    @Inject(CONTAINER_REPOSITORY_CONTRACT)
    private readonly repo: ContainerRepository,
  ) {}

  async execute(
    queryParams: FindAllContainers.Input,
  ): Promise<FindAllContainers.Output> {
    const result = await this.repo.findAll(queryParams);
    if (!result.ok) return result;
    return ok(result.value);
  }
}
