import { PrismaService } from '@Infra/persistence/database/prisma/prisma.service';

describe('PrismaService', () => {
  let prisma: PrismaService;

  beforeEach(async () => {
    prisma = new PrismaService();
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
