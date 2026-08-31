import { Inject, Injectable } from '@nestjs/common';
import {
  CONTAINER_REPOSITORY_CONTRACT,
  type ContainerRepositoryContract,
} from '@/application/repositories/container.repository.contract';
import { Container } from '@/domain/entities/container.entity';
import { ok, type Result } from '@/domain/types/result';
import type { Pagination } from '@/domain/types/pagination';
import type { UseCase } from '../use-case';

export namespace FindAllCOntainers {
  export type Input = Pagination.Input;
  export type Output = Result<Pagination.Output<Container>>;
}

@Injectable()
export class FindAllContainersUseCase implements UseCase<
  FindAllCOntainers.Input,
  FindAllCOntainers.Output
> {
  constructor(
    @Inject(CONTAINER_REPOSITORY_CONTRACT)
    private readonly repo: ContainerRepositoryContract,
  ) {}

  async execute(
    queryParams: FindAllCOntainers.Input,
  ): Promise<FindAllCOntainers.Output> {
    const result = await this.repo.findAll(queryParams);
    if (!result.ok) return result;
    return ok(result.value);
  }
}
