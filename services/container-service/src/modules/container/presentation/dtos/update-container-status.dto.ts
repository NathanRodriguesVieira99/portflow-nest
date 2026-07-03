import type { StatusContainer } from '../../@types/status-container.type';

export interface UpdateContainerStatusDto {
  containerId: string;
  newStatus: StatusContainer;
}
