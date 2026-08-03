import { PrismaService } from '@/container/infrastructure/persistence/database/prisma/prisma.service';
import { ContainerRepositoryImplementation } from '@/container/infrastructure/persistence/repositories/prisma/container.repository.implementation';
import { FindContainerByStatusService } from '@/container/application/services/container/find-container-by-status.service';

import type { ContainerRepositoryContract } from '@Infra/persistence/repositories/prisma/container.repository.contract';

describe('ContainerService', () => {
  let prisma: PrismaService;
  let service: FindContainerByStatusService;
  let repo: ContainerRepositoryContract;

  beforeEach(async () => {
    prisma = new PrismaService();
    repo = new ContainerRepositoryImplementation(prisma);
    service = new FindContainerByStatusService(repo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
