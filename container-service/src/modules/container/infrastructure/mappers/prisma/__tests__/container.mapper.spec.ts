import {
  Container as PrismaContainer,
  STATUS_CONTAINER,
} from '../../../../../../infrastructure/database/prisma/generated/client';
import { Container } from '../../../../domain/models/container.model';
import { PrismaContainerMapper } from '../container.mapper';
import { fakerPT_BR as faker } from '@faker-js/faker';

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
      expect(result).toEqual({
        id: raw.id,
        shipId: raw.shipId,
        terminalId: raw.terminalId,
        originCountry: raw.originCountry,
        destinationCountry: raw.destinationCountry,
        cargoType: raw.cargoType,
        status: raw.statusContainer,
        arrivalDate: raw.arrivalDate,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      });
    });
  });

  describe('toPrisma()', () => {
    it('should map the domain model to Prisma model', () => {
      const container = new Container({
        id: faker.string.uuid(),
        shipId: faker.string.uuid(),
        terminalId: faker.string.uuid(),
        originCountry: faker.location.country(),
        destinationCountry: faker.location.country(),
        cargoType: faker.commerce.productMaterial(),
        status: 'PENDING_DOCUMENTATION',
        arrivalDate: faker.date.recent(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      });

      const result = PrismaContainerMapper.toPrisma(container);

      expect(result).toEqual({
        id: container.id,
        shipId: container.shipId,
        terminalId: container.terminalId,
        originCountry: container.originCountry,
        destinationCountry: container.destinationCountry,
        cargoType: container.cargoType,
        statusContainer: container.status,
        arrivalDate: container.arrivalDate,
        createdAt: container.createdAt,
        updatedAt: container.updatedAt,
      });
    });
  });
});
