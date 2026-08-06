import { PrismaService } from '@/container/infrastructure/persistence/database/prisma/prisma.service';
import { PrismaContainerRepositoryImplementation } from '@/container/infrastructure/persistence/repositories/prisma/prisma-container.repository.implementation';
import { FindContainerByStatusService } from '@/container/application/services/container/find-container-by-status.service';

import type { PrismaContainerRepositoryContract } from '@Infra/persistence/repositories/prisma/prisma-container.repository.contract';

describe('ContainerService', () => {
  let prisma: PrismaService;
  let service: FindContainerByStatusService;
  let repo: PrismaContainerRepositoryContract;

  beforeEach(async () => {
    prisma = new PrismaService();
    repo = new PrismaContainerRepositoryImplementation(prisma);
    service = new FindContainerByStatusService(repo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
