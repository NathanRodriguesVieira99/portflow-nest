import { FindAllContainersUseCase } from '@/application/usecases/container/find-all-containers';
import { PrismaContainerRepositoryFake } from '../../../../mocks/container.repository.fake';
import type { ContainerRepository } from '@/application/repositories/container.repository';

describe('Find All Containers', () => {
  let repo: ContainerRepository;
  let sut: FindAllContainersUseCase;

  beforeEach(() => {
    repo = new PrismaContainerRepositoryFake();
    sut = new FindAllContainersUseCase(repo);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
