import type { StatusContainer } from '@Types/status-container.type';

export interface ContainerStatusEvent {
  containerId: string;
  previousStatus: StatusContainer;
  currentStatus: StatusContainer;
  description: string;
}
