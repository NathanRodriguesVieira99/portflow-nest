import { PrismaService } from '@/infra/persistence/database/prisma/prisma.service';
import { PrismaContainerRepositoryImplementation } from '@/infra/persistence/repositories/prisma/prisma-container.repository.implementation';

import type { PrismaContainerRepositoryContract } from '@/application/repositories/prisma/prisma-container.repository.contract';

describe('Container Repository Implementation', () => {
  let prisma: PrismaService;
  let sut: PrismaContainerRepositoryContract;

  beforeAll(() => {
    prisma = new PrismaService();
    sut = new PrismaContainerRepositoryImplementation(prisma);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
  it.todo('should', () => {});
});
