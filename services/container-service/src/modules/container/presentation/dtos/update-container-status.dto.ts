import type { StatusContainer } from '@/modules/container/@types/status-container';

export interface UpdateContainerStatusDto {
  containerId: string;
  newStatus: StatusContainer;
}
