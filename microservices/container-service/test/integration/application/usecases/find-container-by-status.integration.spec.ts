import { PrismaService } from '@/infra/persistence/database/prisma/prisma.service';
import { PrismaContainerRepositoryImplementation } from '@/infra/persistence/repositories/prisma/prisma-container.repository.implementation';
import { FindContainerByStatusService } from '@/application/usecases/find-container-by-status';

import type { PrismaContainerRepositoryContract } from '@/application/repositories/prisma/prisma-container.repository.contract';

describe('ContainerService', () => {
  let prisma: PrismaService;
  let repo: PrismaContainerRepositoryContract;
  let sut: FindContainerByStatusService;

  beforeEach(() => {
    prisma = new PrismaService();
    repo = new PrismaContainerRepositoryImplementation(prisma);
    sut = new FindContainerByStatusService(repo);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
