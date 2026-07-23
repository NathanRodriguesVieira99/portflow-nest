import type { StatusContainer } from '@Types/status-container.type';

export interface UpdateContainerStatusInput {
  containerId: string;
  newStatus: StatusContainer;
}
