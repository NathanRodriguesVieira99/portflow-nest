import { Restriction } from '@/domain/entities/restriction';

describe('Restriction', () => {
  describe('create()', () => {
    it('should create a Restriction entity', () => {
      const acceptsDangerousCargo = true;
      const acceptsRefrigeratedCargo = true;
      const maxHeightInMeters = 10;
      const maxWeightInTons = 5;
      const restriction = Restriction.create({
        acceptsDangerousCargo,
        acceptsRefrigeratedCargo,
        maxHeightInMeters,
        maxWeightInTons,
      });
      expect(restriction.getAcceptsDangerousCargo()).toBeTruthy();
      expect(restriction.getAcceptsRefrigeratedCargo()).toBeTruthy();
      expect(restriction.getMaxHeightInMeters()).toEqual(10);
      expect(restriction.getMaxWeightInTons()).toEqual(5);
    });
  });
});
