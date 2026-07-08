import { Test, type TestingModule } from '@nestjs/testing';
import { ContainerRepositoryContract } from '../../../domain/repositories/container.repository.contract';

describe('Container Repository', () => {
  let repository: ContainerRepositoryContract;

  const containerRepositoryMock = {
    registerContainerArrival: vi.fn(),
    findAllContainers: vi.fn(),
    findContainerById: vi.fn(),
    findStatusById: vi.fn(),
    updateContainerStatus: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ContainerRepositoryContract,
          useValue: containerRepositoryMock,
        },
      ],
    }).compile();

    const app = module.createNestApplication();
    await app.init();

    repository = module.get(ContainerRepositoryContract);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
