import { Inject, Injectable } from '@nestjs/common';
import {
  CONTAINER_REPOSITORY_CONTRACT,
  type ContainerRepositoryContract,
} from '@/application/repositories/container.repository.contract';
import { Container } from '@/domain/entities/container.entity';
import { ok, type Result } from '@/domain/types/result';
import type { Pagination } from '@/domain/types/pagination';
import type { StatusContainer } from '@/domain/types/status-container.type';
import type { UseCase } from '../use-case';

export namespace FindContainerByStatus {
  export type Input = {
    queryParams: Pagination.Input;
    status: StatusContainer;
  };
  export type Output = Result<Pagination.Output<Container>>;
}

@Injectable()
export class FindContainerByStatusUseCase implements UseCase<
  FindContainerByStatus.Input,
  FindContainerByStatus.Output
> {
  constructor(
    @Inject(CONTAINER_REPOSITORY_CONTRACT)
    private readonly repo: ContainerRepositoryContract,
  ) {}

  async execute({
    queryParams,
    status,
  }: FindContainerByStatus.Input): Promise<FindContainerByStatus.Output> {
    const result = await this.repo.findByStatus(queryParams, status);
    if (!result.ok) return result;
    return ok(result.value);
  }
}
