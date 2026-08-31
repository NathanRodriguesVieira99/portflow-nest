import type { StatusContainer } from '@/domain/types/status-container.type';

export interface ContainerStatusEvent {
  containerId: string;
  previousStatus: StatusContainer;
  currentStatus: StatusContainer;
  description: string;
}
