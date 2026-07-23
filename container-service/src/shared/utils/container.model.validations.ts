// TODO => adicionar mais validações robustas

import type { StatusContainer } from '@/container/@types/status-container.type';

export const validateContainerId = (containerId: string): boolean => {
  if (!containerId) return false;
  if (typeof containerId !== 'string') return false;
  return true;
};

export const validateShipId = (shipId: string): boolean => {
  if (!shipId) return false;
  if (typeof shipId !== 'string') return false;
  return true;
};

export const validateTerminalId = (terminalId: string): boolean => {
  if (!terminalId) return false;
  if (typeof terminalId !== 'string') return false;
  return true;
};

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
