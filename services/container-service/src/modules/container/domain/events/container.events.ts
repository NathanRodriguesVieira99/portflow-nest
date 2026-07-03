import type { StatusContainer } from '../../@types/status-container.type';

export interface ContainerStatusEvent {
  eventId: string;
  containerId: string;
  previousStatus: StatusContainer;
  currentStatus: StatusContainer;
  description: string;
  origin: string;
  dateTime: Date;
  correlationId: string;
}
