import { fakerPT_BR as faker } from '@faker-js/faker';
import {
  Container as PrismaContainer,
  STATUS_CONTAINER,
} from '../../../../infrastructure/database/prisma/generated/client';
import { Container } from '@Models/container.model';
import { PrismaContainerMapper } from './container.mapper';

describe('Prisma Container Mapper', () => {
  describe('toDomain()', () => {
    it('should map the Prisma model to domain model', () => {
      const raw: PrismaContainer = {
        id: faker.string.uuid(),
        shipId: faker.string.uuid(),
        terminalId: faker.string.uuid(),
        originCountry: faker.location.country(),
        destinationCountry: faker.location.country(),
        cargoType: faker.commerce.productMaterial(),
        statusContainer: STATUS_CONTAINER.PENDING_DOCUMENTATION,
        arrivalDate: faker.date.recent(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      };

      const result = PrismaContainerMapper.toDomain(raw);

      expect(result).toBeInstanceOf(Container);
      expect(result.getId()).toEqual(raw.id);
      expect(result.getShipId()).toBe(raw.shipId);
      expect(result.getTerminalId()).toBe(raw.terminalId);
      expect(result.getOriginCountry()).toBe(raw.originCountry);
      expect(result.getDestinationCountry()).toBe(raw.destinationCountry);
      expect(result.getCargoType()).toBe(raw.cargoType);
      expect(result.getStatus()).toBe(raw.statusContainer);
      expect(result.getArrivalDate()).toBe(raw.arrivalDate);
      expect(result.getCreatedAt()).toBe(raw.createdAt);
      expect(result.getUpdatedAt()).toBe(raw.updatedAt);
    });
  });

  describe('toPrisma()', () => {
    it('should map the domain model to Prisma model', () => {
      const container = Container.create({
        shipId: faker.string.uuid(),
        terminalId: faker.string.uuid(),
        originCountry: faker.location.country(),
        destinationCountry: faker.location.country(),
        cargoType: faker.commerce.productMaterial(),
        status: 'ARRIVED',
        arrivalDate: faker.date.recent(),
      });

      const result = PrismaContainerMapper.toPrisma(container);

      expect(container.getId()).toBe(result.id);
      expect(container.getShipId()).toBe(result.shipId);
      expect(container.getTerminalId()).toBe(result.terminalId);
      expect(container.getOriginCountry()).toBe(result.originCountry);
      expect(container.getDestinationCountry()).toBe(result.destinationCountry);
      expect(container.getStatus()).toBe(result.statusContainer);
      expect(container.getArrivalDate()).toBe(result.arrivalDate);
      expect(container.getCreatedAt()).toBe(result.createdAt);
      expect(container.getUpdatedAt()).toBe(result.updatedAt);
    });
  });
});
