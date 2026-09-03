import { FindContainerByStatusUseCase } from '@/application/usecases/container/find-container-by-status';
import { PrismaContainerRepositoryFake } from '../../../../mocks/container.repository.fake';
import type { ContainerRepository } from '@/application/repositories/container.repository';

describe('Find Container By Status', () => {
  let repo: ContainerRepository;
  let sut: FindContainerByStatusUseCase;

  beforeEach(() => {
    repo = new PrismaContainerRepositoryFake();
    sut = new FindContainerByStatusUseCase(repo);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
