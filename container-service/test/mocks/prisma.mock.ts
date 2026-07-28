export const mockPrisma = {
  $connect: vi.fn(),
  $disconnect: vi.fn(),
  onModuleInit: vi.fn(),
  onModuleDestroy: vi.fn(),
};
