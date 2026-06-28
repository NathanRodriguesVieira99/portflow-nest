import { Container } from '../models/container.model';

import type { StatusContainer } from '../../@types/status-container';
import type { ContainerArrivalRequestDto } from '../../presentation/dtos/container-arrival-request.dto';
import type { ContainerArrivalResponseDto } from '../../presentation/dtos/container-arrival-response.dto';
import type { UpdateContainerStatusDto } from '../../presentation/dtos/update-container-status.dto';
import type { Result } from '../../../../shared/errors/result';

export abstract class ContainerRepositoryContract {
  abstract registerContainerArrival: ({
    containerId,
    shipId,
    terminalId,
    originCountry,
    destinationCountry,
    cargoType,
  }: ContainerArrivalRequestDto) => Promise<
    Result<ContainerArrivalResponseDto>
  >;

  abstract findAllContainers: () => Promise<Result<Container[]>>;

  abstract findContainerById: (
    containerId: string,
  ) => Promise<Result<Container>>;

  abstract findStatusById: (
    containerId: string,
  ) => Promise<Result<StatusContainer>>;

  abstract updateContainerStatus: ({
    containerId,
    newStatus,
  }: UpdateContainerStatusDto) => Promise<Result<Container>>;
}
