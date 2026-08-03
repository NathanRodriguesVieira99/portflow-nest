import { PrismaService } from '@/container/infrastructure/persistence/database/prisma/prisma.service';
import { ContainerRepositoryImplementation } from '@/container/infrastructure/persistence/repositories/prisma/container.repository.implementation';

import type { ContainerRepositoryContract } from '@/container/infrastructure/persistence/repositories/prisma/container.repository.contract';

describe('Container Repository Implementation', () => {
  let prisma: PrismaService;
  let repo: ContainerRepositoryContract;

  beforeEach(async () => {
    prisma = new PrismaService();
    repo = new ContainerRepositoryImplementation(prisma);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  it.todo('should', () => {});
});
