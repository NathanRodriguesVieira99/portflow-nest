import type { StatusContainer } from '@/@types/status-container.type';

export const validateContainerStatus = (
  status: string,
): status is StatusContainer => {
  if (!status) return false;
  if (
    status !== 'ARRIVED' &&
    status !== 'PENDING_DOCUMENTATION' &&
    status !== 'DOCUMENTATION_CREATED' &&
    status !== 'INSPECTION_REQUESTED' &&
    status !== 'INSPECTION_APPROVED' &&
    status !== 'INSPECTION_REJECTED' &&
    status !== 'CUSTOMS_CLEARED' &&
    status !== 'BLOCKED' &&
    status !== 'STORED_IN_YARD' &&
    status !== 'RELEASED'
  ) {
    return false;
  }
  return true;
};
