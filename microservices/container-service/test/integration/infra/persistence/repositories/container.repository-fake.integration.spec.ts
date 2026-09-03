import { PrismaContainerRepositoryFake } from '../../../../mocks/container.repository.fake';
import type { ContainerRepository } from '@/application/repositories/container.repository';

describe('Container Repository Implementation', () => {
  let sut: ContainerRepository;

  beforeAll(() => {
    sut = new PrismaContainerRepositoryFake();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
  it.todo('should', () => {});
});
