import { PrismaService } from '@/external/persistence/database/prisma/prisma.service';
import { FindContainerByStatusUseCase } from '@/application/usecases/container/find-container-by-status';
import { PrismaContainerRepositoryImplementation } from '@/external/persistence/repositories/prisma/prisma-container.repository.implementation';
import type { ContainerRepositoryContract } from '@/application/repositories/container.repository.contract';

describe('Find Container By Status', () => {
  let prisma: PrismaService;
  let repo: ContainerRepositoryContract;
  let sut: FindContainerByStatusUseCase;

  beforeEach(() => {
    prisma = new PrismaService();
    repo = new PrismaContainerRepositoryImplementation(prisma);
    sut = new FindContainerByStatusUseCase(repo);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
