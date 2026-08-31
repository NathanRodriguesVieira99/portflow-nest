import { PrismaService } from '@/external/persistence/database/prisma/prisma.service';

describe('PrismaService', () => {
  let sut: PrismaService;

  beforeAll(async () => {
    sut = new PrismaService();
  });

  it('service should be defined', () => {
    expect(sut).toBeDefined();
  });
  it('should call $connect', async () => {
    const connectSpy = vi.spyOn(sut, '$connect').mockResolvedValueOnce();
    await sut.onModuleInit();
    expect(connectSpy).toHaveBeenCalledOnce();
  });
  it('should call $disconnect', async () => {
    const disconnectSpy = vi.spyOn(sut, '$disconnect').mockResolvedValueOnce();
    await sut.onModuleDestroy();
    expect(disconnectSpy).toHaveBeenCalledOnce();
  });
});
