import { Container } from '@Models/container.model';

import type {
  PaginationInput,
  PaginationOutput,
} from '@/container/domain/interfaces/pagination';
import type { StatusContainer } from '@Types/status-container.type';
import type { Result } from '@Shared/result';

export interface ContainerRepositoryContract {
  save(container: Container): Promise<Result<Container>>;
  update(container: Container): Promise<Result<Container>>;
  remove(containerId: string): Promise<Result<string>>;
  findById: (containerId: string) => Promise<Result<Container>>;
  findAll: ({
    page,
    perPage,
  }: PaginationInput) => Promise<Result<PaginationOutput<Container>>>;

  findByStatus: (
    { page, perPage }: PaginationInput,
    status: StatusContainer,
  ) => Promise<Result<PaginationOutput<Container>>>;
}

export const CONTAINER_REPOSITORY_CONTRACT = Symbol(
  'ContainerRepositoryContract',
);
