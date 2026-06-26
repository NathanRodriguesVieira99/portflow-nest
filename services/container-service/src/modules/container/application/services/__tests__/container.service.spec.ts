import { Test, TestingModule } from '@nestjs/testing';

import { TerminalService } from '../terminal.service';
import { ContainerProducer } from '../../../presentation/events/container.producer';
import { IContainerRepository } from '../../../infra/repositories/container.repository';

import { ContainerService } from '../container.service';

describe('ContainerService', () => {
  let service: ContainerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContainerService,
        {
          provide: IContainerRepository,
          useValue: {
            registerContainerArrival: vi.fn(),
            findAllContainers: vi.fn(),
            findContainerById: vi.fn(),
            findStatusById: vi.fn(),
            updateContainerStatus: vi.fn(),
          },
        },
        {
          provide: TerminalService,
          useValue: { validateTerminal: vi.fn() },
        },
        {
          provide: ContainerProducer,
          useValue: { sendPendingDocumentationEvent: vi.fn() },
        },
      ],
    }).compile();

    service = module.get<ContainerService>(ContainerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
