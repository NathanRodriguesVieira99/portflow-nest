import { Test, type TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
  });

  it('service should be defined', () => {
    expect(prisma).toBeDefined();
  });

  it('should call $connect', async () => {
    const connectSpy = vi.spyOn(prisma, '$connect').mockResolvedValueOnce();
    await prisma.onModuleInit();
    expect(connectSpy).toHaveBeenCalledOnce();
  });

  it('should call $disconnect', async () => {
    const disconnectSpy = vi
      .spyOn(prisma, '$disconnect')
      .mockResolvedValueOnce();
    await prisma.onModuleDestroy();
    expect(disconnectSpy).toHaveBeenCalledOnce();
  });
});
