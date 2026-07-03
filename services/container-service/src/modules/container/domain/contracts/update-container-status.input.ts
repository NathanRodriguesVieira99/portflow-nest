import type { StatusContainer } from '../types/status-container.type';

export interface UpdateContainerStatusInput {
  containerId: string;
  newStatus: StatusContainer;
}
