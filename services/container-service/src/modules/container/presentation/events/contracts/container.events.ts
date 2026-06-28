export interface ContainerStatusEvent {
  eventId: string;
  containerId: string;
  previousStatus: string;
  currentStatus: string;
  description: string;
  origin: string;
  dateTime: Date;
  correlationId: string;
}
