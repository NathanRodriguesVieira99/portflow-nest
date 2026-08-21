import { Capacity } from '@/domain/entities/capacity';
import { Restriction } from '@/domain/entities/restriction';
import {
  acceptedCargoTypes,
  equipments,
  makeTerminal,
  zones,
} from 'test/factories';

describe('Terminal', () => {
  describe('create()', () => {
    it('should create a Terminal entity', () => {
      const terminal = makeTerminal();
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
      const terminal = makeTerminal();
      expect(terminal.acceptCargoType('Rifles')).toBe(false);
      expect(terminal.acceptCargoType('Wood')).toBe(true);
    });
  });
});
