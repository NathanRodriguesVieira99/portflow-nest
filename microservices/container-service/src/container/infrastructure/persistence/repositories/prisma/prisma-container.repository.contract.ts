import { Container } from '@Models/container.model';

import type { Pagination } from '@/container/domain/contracts/pagination';
import type { StatusContainer } from '@Types/status-container.type';
import type { Result } from '@Shared/result';

export interface PrismaContainerRepositoryContract {
  save(container: Container): Promise<Result<Container>>;
  update(container: Container): Promise<Result<Container>>;
  remove(containerId: string): Promise<Result<string>>;
  findById: (containerId: string) => Promise<Result<Container>>;
  findAll: ({
    page,
    perPage,
  }: Pagination.Input) => Promise<Result<Pagination.Output<Container>>>;

  findByStatus: (
    { page, perPage }: Pagination.Input,
    status: StatusContainer,
  ) => Promise<Result<Pagination.Output<Container>>>;
}

export const CONTAINER_REPOSITORY_CONTRACT = Symbol(
  'ContainerRepositoryContract',
);
