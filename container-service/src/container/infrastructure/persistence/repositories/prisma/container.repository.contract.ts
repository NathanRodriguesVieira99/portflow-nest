import { Container } from '@Models/container.model';

import type {
  PaginationInput,
  PaginationOutput,
} from '@/container/application/contracts/pagination';
import type { StatusContainer } from '@Types/status-container.type';
import type { Result } from '@Shared/result';

export abstract class ContainerRepositoryContract {
  abstract save(container: Container): Promise<Result<Container>>;
  abstract update(container: Container): Promise<Result<Container>>;
  abstract remove(containerId: string): Promise<Result<string>>;
  abstract findById: (containerId: string) => Promise<Result<Container>>;
  abstract findAll: ({
    page,
    perPage,
  }: PaginationInput) => Promise<Result<PaginationOutput<Container>>>;

  abstract findByStatus: (
    { page, perPage }: PaginationInput,
    status: StatusContainer,
  ) => Promise<Result<PaginationOutput<Container>>>;
}
