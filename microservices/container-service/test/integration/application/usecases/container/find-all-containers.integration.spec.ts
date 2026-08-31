import { FindAllContainersUseCase } from '@/application/usecases/container/find-all-containers';
import { PrismaService } from '@/external/persistence/database/prisma/prisma.service';
import { PrismaContainerRepositoryImplementation } from '@/external/persistence/repositories/prisma/prisma-container.repository.implementation';
import type { ContainerRepositoryContract } from '@/application/repositories/container.repository.contract';

describe('Find All Containers', () => {
  let prisma: PrismaService;
  let repo: ContainerRepositoryContract;
  let sut: FindAllContainersUseCase;

  beforeEach(() => {
    prisma = new PrismaService();
    repo = new PrismaContainerRepositoryImplementation(prisma);
    sut = new FindAllContainersUseCase(repo);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
