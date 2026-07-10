import { fakerPT_BR as faker } from '@faker-js/faker';
import { Container } from '../../../../../src/modules/container/domain/models/container.model';

describe('Container Model', () => {
  it('should create a container', () => {
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
});
