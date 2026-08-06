import { PrismaService } from '@/container/infrastructure/persistence/database/prisma/prisma.service';
import { PrismaContainerRepositoryImplementation } from '@/container/infrastructure/persistence/repositories/prisma/prisma-container.repository.implementation';

import type { PrismaContainerRepositoryContract } from '@/container/infrastructure/persistence/repositories/prisma/prisma-container.repository.contract';

describe('Container Repository Implementation', () => {
  let prisma: PrismaService;
  let repo: PrismaContainerRepositoryContract;

  beforeEach(async () => {
    prisma = new PrismaService();
    repo = new PrismaContainerRepositoryImplementation(prisma);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  it.todo('should', () => {});
});
