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

export const validateStatus = (status: StatusContainer) => {
  if (!status) return false;
  if (typeof status !== 'string') return false;
  return true;
};
