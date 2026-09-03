import sinon from 'sinon';
import { PrismaService } from '@/external/persistence/database/prisma/prisma.service';

describe('PrismaService', () => {
  let sut: PrismaService;

  beforeAll(async () => {
    sut = new PrismaService();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  /*
   * Essa suit acessa o PrismaService.prototype para criar um stub apenas dos métodos '$connect' e '$disconnect' que são herdados do PrismaClient,
   * não precisa criar um stub do PrismaService inteiro.
   */
  it('should call $connect', async () => {
    const connectStub = sinon.stub(PrismaService.prototype, '$connect');
    connectStub.resolves();
    await sut.onModuleInit();
    expect(connectStub.calledOnce).toBe(true);
  });
  it('should call $disconnect', async () => {
    const disconnectStub = sinon.stub(PrismaService.prototype, '$disconnect');
    disconnectStub.resolves();
    await sut.onModuleDestroy();
    expect(disconnectStub.calledOnce).toBe(true);
  });
});
