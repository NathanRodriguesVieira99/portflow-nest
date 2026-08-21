import { Capacity } from '@/domain/entities/capacity';
import { makeCapacity } from 'test/factories';
import { DomainException } from '@/domain/exceptions/domain-exception';

describe('Capacity', () => {
  describe('create()', () => {
    it('should create a new Capacity entity', () => {
      const maxContainers = 11;
      const capacity = makeCapacity({ maxContainers });
      expect(capacity.getMaxContainers()).toBe(11);
      expect(capacity.getCurrentOccupation()).toEqual(expect.any(Number));
    });
  });
  describe('hasAvailableCapacity()', () => {
    it('should return true when the current occupation is below max', () => {
      const currentOccupation = 4;
      const capacity = makeCapacity({ currentOccupation });
      expect(capacity.hasAvailableCapacity()).toBeTruthy();
    });
    it('should return true when terminal is empty', () => {
      const currentOccupation = 0;
      const capacity = makeCapacity({ currentOccupation });
      expect(capacity.hasAvailableCapacity()).toBeTruthy();
    });
    it('should return false when occupation reaches max', () => {
      const currentOccupation = 10;
      const capacity = makeCapacity({ currentOccupation });
      expect(capacity.hasAvailableCapacity()).toBeFalsy();
    });
    it('should validate invalid state on maxContainers', () => {
      const maxContainers = 0;
      const currentOccupation = 15;
      expect(() =>
        Capacity.create({
          maxContainers,
          currentOccupation,
        }),
      ).toThrow(
        new DomainException('maxContainers should be a positive number!'),
      );
    });
    it('should validate invalid state on currentOccupation', () => {
      const maxContainers = 10;
      const currentOccupation = 15;
      expect(() =>
        Capacity.create({
          maxContainers,
          currentOccupation,
        }),
      ).toThrow(
        new DomainException('currentOccupation cannot exceed maxContainers'),
      );
    });
  });
});
