import {
  Restriction,
  type CreateRestriction,
} from '@/domain/entities/restriction';
import { makeRestriction } from 'test/factories/make-restriction';

describe('Restriction', () => {
  describe('create()', () => {
    it('should create a Restriction entity', () => {
      const restriction = makeRestriction();
      expect(restriction.getAcceptsDangerousCargo()).toBeTruthy();
      expect(restriction.getAcceptsRefrigeratedCargo()).toBeTruthy();
      expect(restriction.getMaxHeightInMeters()).toEqual(10);
      expect(restriction.getMaxWeightInTons()).toEqual(5);
    });
  });
});
