import type { StatusContainer } from '@/modules/container/domain/enums/status-container.enum';

export interface UpdateContainerStatusDto {
  containerId: string;
  newStatus: StatusContainer;
}
