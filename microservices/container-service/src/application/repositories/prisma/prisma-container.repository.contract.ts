import { Container } from '@/domain/entities/container.entity';
import type { Pagination } from '@/@types/pagination';
import type { StatusContainer } from '@/@types/status-container.type';
import type { Result } from '@/@types/result';

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
