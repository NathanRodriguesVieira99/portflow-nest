import { Container } from '../models/container.model';

import type { StatusContainer } from '../types/status-container.type';
import type { ContainerArrivalInput } from '../contracts/container-arrival.input';
import type { ContainerArrivalOutput } from '../contracts/container-arrival.output';
import type { UpdateContainerStatusInput } from '../contracts/update-container-status.input';
import type { Result } from '../../../../shared/result';
import type { PaginationInput } from '../contracts/pagination.input';
import type { PaginationOutput } from '../contracts/pagination.output';

export abstract class ContainerRepositoryContract {
  abstract registerContainerArrival: ({
    containerId,
    shipId,
    terminalId,
    originCountry,
    destinationCountry,
    cargoType,
  }: ContainerArrivalInput) => Promise<Result<ContainerArrivalOutput>>;

  abstract findContainerById: (
    containerId: string,
  ) => Promise<Result<Container>>;

  abstract findAllContainers: ({
    page,
    perPage,
  }: PaginationInput) => Promise<Result<PaginationOutput<Container>>>;

  abstract findContainerByStatus: (
    { page, perPage }: PaginationInput,
    status: StatusContainer,
  ) => Promise<Result<PaginationOutput<Container>>>;

  abstract updateContainerStatus: ({
    containerId,
    newStatus,
  }: UpdateContainerStatusInput) => Promise<Result<Container>>;
}
