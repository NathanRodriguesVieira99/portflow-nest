import { Test, type TestingModule } from '@nestjs/testing';

import { PrismaService } from '../prisma.service';

describe('PrismaService', () => {
  let prisma: PrismaService;

  const mockPrisma = {
    $connect: vi.fn(),
    $disconnect: vi.fn(),
    onModuleInit: vi.fn(),
    onModuleDestroy: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: PrismaService, useValue: mockPrisma }],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
  });

  it('service should be defined', () => {
    expect(prisma).toBeDefined();
  });

  it('should call $connect', async () => {
    vi.spyOn(prisma, '$connect').mockResolvedValue();
    await prisma.$connect();
    expect(prisma.$connect).toHaveBeenCalledTimes(1);
  });

  it('should call $disconnect', async () => {
    vi.spyOn(prisma, '$disconnect').mockResolvedValue();
    await prisma.$disconnect();
    expect(prisma.$disconnect).toHaveBeenCalledTimes(1);
  });
});
