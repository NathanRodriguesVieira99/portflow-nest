import type { StatusContainer } from '../../domain/types/status-container.type';

export interface UpdateContainerStatusDto {
  containerId: string;
  newStatus: StatusContainer;
}
