import { fakerPT_BR as faker } from '@faker-js/faker';
import {
  Container as PrismaContainer,
  STATUS_CONTAINER,
} from '@/external/persistence/database/prisma/generated/client';
import { Container } from '@/domain/entities/container.entity';
import { PrismaContainerMapper } from '@/external/persistence/mappers/prisma/prisma-container.mapper';

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
      const response = PrismaContainerMapper.toDomain(raw);
      expect(response).toBeInstanceOf(Container);
      expect(response.getId()).toEqual(raw.id);
      expect(response.getShipId()).toBe(raw.shipId);
      expect(response.getTerminalId()).toBe(raw.terminalId);
      expect(response.getOriginCountry()).toBe(raw.originCountry);
      expect(response.getDestinationCountry()).toBe(raw.destinationCountry);
      expect(response.getCargoType()).toBe(raw.cargoType);
      expect(response.getStatus()).toBe(raw.statusContainer);
      expect(response.getArrivalDate()).toBe(raw.arrivalDate);
      expect(response.getCreatedAt()).toBe(raw.createdAt);
      expect(response.getUpdatedAt()).toBe(raw.updatedAt);
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
      const response = PrismaContainerMapper.toPrisma(container);
      expect(container.getId()).toBe(response.id);
      expect(container.getShipId()).toBe(response.shipId);
      expect(container.getTerminalId()).toBe(response.terminalId);
      expect(container.getOriginCountry()).toBe(response.originCountry);
      expect(container.getDestinationCountry()).toBe(
        response.destinationCountry,
      );
      expect(container.getStatus()).toBe(response.statusContainer);
      expect(container.getArrivalDate()).toBe(response.arrivalDate);
      expect(container.getCreatedAt()).toBe(response.createdAt);
      expect(container.getUpdatedAt()).toBe(response.updatedAt);
    });
  });
});
