import { Container } from '@/domain/entities/container.entity';
import type { Pagination } from '@/domain/types/pagination';
import type { Result } from '@/domain/types/result';
import type { StatusContainer } from '@/domain/types/status-container.type';

export interface ContainerRepositoryContract {
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
