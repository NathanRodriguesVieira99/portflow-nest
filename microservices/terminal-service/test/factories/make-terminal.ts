import { fakerPT_BR as faker } from '@faker-js/faker';
import { Terminal, type CreateTerminal } from '@/domain/entities/terminal';
import { Zone } from '@/domain/entities/zone';
import { Capacity } from '@/domain/entities/capacity';
import { Restriction } from '@/domain/entities/restriction';

const terminalId = faker.string.uuid();
const name = faker.company.name();
const isActive = true;
export const acceptedCargoTypes = ['WOOD', 'OIL', 'GAS', 'CARS'];
const capacity = Capacity.create({
  maxContainers: 9,
  currentOccupation: 8,
});
export const zones = [
  Zone.create({
    code: 'Z-001',
    type: 'Military',
    isAvailable: true,
    unavailableReason: 'The cargo is not allowed in Brazil',
  }),
];
const restrictions = Restriction.create({
  acceptsDangerousCargo: true,
  acceptsRefrigeratedCargo: true,
  maxHeightInMeters: 10,
  maxWeightInTons: 5,
});
export const equipments = ['Radar', 'Gyrocompass', 'Bilge pump'];

export const makeTerminal = (
  override: Partial<CreateTerminal.Input> = {},
): Terminal =>
  Terminal.create({
    terminalId,
    name,
    isActive,
    acceptedCargoTypes,
    capacity,
    zones,
    restrictions,
    equipments,
  });
