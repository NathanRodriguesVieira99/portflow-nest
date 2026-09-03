/*
 * Este contrato inverte a dependência, os UseCases dependem desse contrato e não conhecem a implementação (Prisma ORM, in-memory), ele nunca sabe onde os dados são persistidos.
 */

import { Container } from '@/domain/entities/container.entity';
import type { Pagination } from '@/domain/types/pagination';
import type { Result } from '@/domain/types/result';
import type { StatusContainer } from '@/domain/types/status-container.type';

export interface ContainerRepository {
  save(container: Container): Promise<Result<Container>>;
  update(container: Container): Promise<Result<Container>>;
  remove(containerId: string): Promise<Result<string>>;
  findById: (containerId: string) => Promise<Result<Container>>;
  findAll: (
    queryParams: Pagination.Input,
  ) => Promise<Result<Pagination.Output<Container>>>;
  findByStatus: (
    queryParams: Pagination.Input,
    status: StatusContainer,
  ) => Promise<Result<Pagination.Output<Container>>>;
}

export const CONTAINER_REPOSITORY_CONTRACT = Symbol(
  'ContainerRepositoryContract',
);
