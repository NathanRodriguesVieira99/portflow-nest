import { fakerPT_BR as faker } from '@faker-js/faker';
import { Container } from '@Models/container.model';
import { ContainerException } from '../exceptions';

import type { StatusContainer } from '@/container/@types/status-container.type';

describe('Container Model', () => {
  describe('Methods', () => {
    it('Container.create()', () => {
      const container = Container.create({
        id: faker.string.uuid(),
        shipId: faker.string.uuid(),
        terminalId: faker.string.uuid(),
        originCountry: 'Brasil',
        destinationCountry: 'China',
        cargoType: faker.commerce.productMaterial(),
        status: 'ARRIVED',
        arrivalDate: faker.date.recent(),
      });

      expect(container.getId()).toEqual(expect.any(String));
      expect(container.getShipId()).toEqual(expect.any(String));
      expect(container.getTerminalId()).toEqual(expect.any(String));
      expect(container.getOriginCountry()).toBe('Brasil');
      expect(container.getDestinationCountry()).toBe('China');
      expect(container.getStatus()).toBe('ARRIVED');
      expect(container.getArrivalDate()).toEqual(expect.any(Date));
      expect(container.getCreatedAt()).toEqual(expect.any(Date));
      expect(container.getUpdatedAt()).toEqual(expect.any(Date));
    });

    it.todo('Container.validateArrival()', () => {});

    it.todo('Container.updateStatus()', () => {});
  });

  describe('ContainerError', () => {
    it('validate invalid container id', () => {
      expect(() =>
        Container.create({
          id: '',
          shipId: faker.string.uuid(),
          terminalId: faker.string.uuid(),
          originCountry: 'Brasil',
          destinationCountry: 'China',
          cargoType: faker.commerce.productMaterial(),
          status: 'ARRIVED',
          arrivalDate: faker.date.recent(),
        }),
      ).toThrow(new ContainerException('Invalid Container'));
    });

    it('validate invalid ship id', () => {
      expect(() =>
        Container.create({
          id: faker.string.uuid(),
          shipId: '',
          terminalId: faker.string.uuid(),
          originCountry: 'Brasil',
          destinationCountry: 'China',
          cargoType: faker.commerce.productMaterial(),
          status: 'ARRIVED',
          arrivalDate: faker.date.recent(),
        }),
      ).toThrow(new ContainerException('Invalid Ship'));
    });

    it('validate invalid terminal id', () => {
      expect(() =>
        Container.create({
          id: faker.string.uuid(),
          shipId: faker.string.uuid(),
          terminalId: '',
          originCountry: 'Brasil',
          destinationCountry: 'China',
          cargoType: faker.commerce.productMaterial(),
          status: 'ARRIVED',
          arrivalDate: faker.date.recent(),
        }),
      ).toThrow(new ContainerException('Invalid Terminal'));
    });

    it('validate invalid container status', () => {
      expect(() =>
        Container.create({
          id: faker.string.uuid(),
          shipId: faker.string.uuid(),
          terminalId: faker.string.uuid(),
          originCountry: 'Brasil',
          destinationCountry: 'China',
          cargoType: faker.commerce.productMaterial(),
          status: 'INVALID_STATUS' as StatusContainer,
          arrivalDate: faker.date.recent(),
        }),
      ).toThrow(new ContainerException('Invalid status'));
    });
  });
});
