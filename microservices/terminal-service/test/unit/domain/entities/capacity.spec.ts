import { Capacity } from '@/domain/entities/capacity';
import { DomainException } from '@/domain/exceptions/domain-exception';

describe('Capacity', () => {
  describe('create()', () => {
    it('should create a new Capacity entity', () => {
      const maxContainers = 10;
      const currentOccupation = 5;
      const capacity = Capacity.create({
        maxContainers,
        currentOccupation,
      });
      expect(capacity.getMaxContainers()).toEqual(expect.any(Number));
      expect(capacity.getCurrentOccupation()).toEqual(expect.any(Number));
    });
  });

  describe('hasAvailableCapacity()', () => {
    it('should return true when occupation is below max', () => {
      const maxContainers = 10;
      const currentOccupation = 5;
      const capacity = Capacity.create({
        maxContainers,
        currentOccupation,
      });
      expect(capacity.hasAvailableCapacity()).toBeTruthy();
    });
    it('should return true when terminal is empty', () => {
      const maxContainers = 10;
      const currentOccupation = 0;
      const capacity = Capacity.create({
        maxContainers,
        currentOccupation,
      });
      expect(capacity.hasAvailableCapacity()).toBeTruthy();
    });
    it('should return false when occupation reaches max', () => {
      const maxContainers = 10;
      const currentOccupation = 10;
      const capacity = Capacity.create({
        maxContainers,
        currentOccupation,
      });
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
