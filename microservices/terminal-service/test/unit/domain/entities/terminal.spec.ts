import { fakerPT_BR as faker } from '@faker-js/faker';
import { Terminal } from '@/domain/entities/terminal';
import { Capacity } from '@/domain/entities/capacity';
import { Zone } from '@/domain/entities/zone';
import { Restriction } from '@/domain/entities/restriction';

describe('Terminal', () => {
  describe('create()', () => {
    it('should create a Terminal entity', () => {
      const terminalId = faker.string.uuid();
      const name = faker.company.name();
      const isActive = true;
      const acceptedCargoTypes = ['WOOD', 'OIL', 'GAS', 'CARS'];
      const capacity = Capacity.create({
        maxContainers: 9,
        currentOccupation: 8,
      });
      const zones = [
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
      const equipments = ['Radar', 'Gyrocompass', 'Bilge pump'];
      const terminal = Terminal.create({
        terminalId,
        name,
        isActive,
        acceptedCargoTypes,
        capacity,
        zones,
        restrictions,
        equipments,
      });
      expect(terminal.getTerminalId()).toEqual(expect.any(String));
      expect(terminal.getName()).toEqual(expect.any(String));
      expect(terminal.getIsActive()).toBeTruthy();
      expect(terminal.getAcceptedCargoTypes()).toEqual(acceptedCargoTypes);
      expect(terminal.getCapacity()).toBeInstanceOf(Capacity);
      expect(terminal.getZones()).toEqual(zones);
      expect(terminal.getRestrictions()).toBeInstanceOf(Restriction);
      expect(terminal.getEquipments()).toEqual(equipments);
    });
  });

  describe('restore()', () => {
    it.todo('');
  });

  describe('acceptCargoType()', () => {
    it('should validate if the cargo type is accepted', () => {
      const terminalId = faker.string.uuid();
      const name = faker.company.name();
      const isActive = true;
      const acceptedCargoTypes = ['WOOD', 'OIL', 'GAS', 'CARS'];
      const capacity = Capacity.create({
        maxContainers: 9,
        currentOccupation: 8,
      });
      const zones = [
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
      const equipments = ['Radar', 'Gyrocompass', 'Bilge pump'];
      const terminal = Terminal.create({
        terminalId,
        name,
        isActive,
        acceptedCargoTypes,
        capacity,
        zones,
        restrictions,
        equipments,
      });
      expect(terminal.acceptCargoType('Rifles')).toBe(false);
      expect(terminal.acceptCargoType('Wood')).toBe(true);
    });
  });
});
