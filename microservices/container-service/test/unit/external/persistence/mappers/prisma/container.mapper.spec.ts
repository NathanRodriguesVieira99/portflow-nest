import { fakerPT_BR as faker } from '@faker-js/faker';
import {
  Container as PrismaContainer,
  STATUS_CONTAINER,
} from '@/external/persistence/database/prisma/generated/client';
import { PrismaContainerMapper } from '@/external/persistence/mappers/prisma/prisma-container.mapper';
import type { ContainerDAO } from '@/infra/persistence/database/DAOs/container.dao';

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
      const response = PrismaContainerMapper.toDTO(raw);
      expect(response.id).toEqual(raw.id);
      expect(response.shipId).toBe(raw.shipId);
      expect(response.terminalId).toBe(raw.terminalId);
      expect(response.originCountry).toBe(raw.originCountry);
      expect(response.destinationCountry).toBe(raw.destinationCountry);
      expect(response.cargoType).toBe(raw.cargoType);
      expect(response.status).toBe(raw.statusContainer);
      expect(response.arrivalDate).toBe(raw.arrivalDate);
      expect(response.createdAt).toBe(raw.createdAt);
      expect(response.updatedAt).toBe(raw.updatedAt);
    });
  });
  describe('toPrisma()', () => {
    it('should map the domain model to Prisma model', () => {
      const dto: ContainerDAO.SaveDTO = {
        id: faker.string.uuid(),
        shipId: faker.string.uuid(),
        terminalId: faker.string.uuid(),
        originCountry: faker.location.country(),
        destinationCountry: faker.location.country(),
        cargoType: faker.commerce.productMaterial(),
        status: 'ARRIVED',
        arrivalDate: faker.date.recent(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      };
      const response = PrismaContainerMapper.toPrisma(dto);
      expect(dto.id).toBe(response.id);
      expect(dto.shipId).toBe(response.shipId);
      expect(dto.terminalId).toBe(response.terminalId);
      expect(dto.originCountry).toBe(response.originCountry);
      expect(dto.destinationCountry).toBe(response.destinationCountry);
      expect(dto.status).toBe(response.statusContainer);
      expect(dto.arrivalDate).toBe(response.arrivalDate);
      expect(dto.createdAt).toBe(response.createdAt);
      expect(dto.updatedAt).toBe(response.updatedAt);
    });
  });
});
