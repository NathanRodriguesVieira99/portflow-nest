import {
  Restriction,
  type CreateRestriction,
} from '@/domain/entities/restriction';

const acceptsDangerousCargo = true;
const acceptsRefrigeratedCargo = true;
const maxHeightInMeters = 10;
const maxWeightInTons = 5;
export const makeRestriction = (
  override: Partial<CreateRestriction.Input> = {},
) =>
  Restriction.create({
    acceptsDangerousCargo,
    acceptsRefrigeratedCargo,
    maxHeightInMeters,
    maxWeightInTons,
  });
