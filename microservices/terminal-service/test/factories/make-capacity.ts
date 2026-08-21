import { Capacity, type CreateCapacity } from '@/domain/entities/capacity';

export const makeCapacity = (
  override: Partial<CreateCapacity.Input> = {},
): Capacity =>
  Capacity.create({
    maxContainers: 10,
    currentOccupation: 5,
    ...override,
  });
