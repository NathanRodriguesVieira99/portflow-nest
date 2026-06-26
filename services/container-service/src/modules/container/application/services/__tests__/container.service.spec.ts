import { Test, TestingModule } from '@nestjs/testing';

import { TerminalService } from '../terminal.service';
import { ContainerProducer } from '../../../presentation/events/container.producer';
import { IContainerRepository } from '../../../infra/repositories/container.repository';

import { ContainerService } from '../container.service';

describe('ContainerService', () => {
  let service: ContainerService;

  const containerRepositoryMock = {
    registerContainerArrival: vi.fn(),
    findAllContainers: vi.fn(),
    findContainerById: vi.fn(),
    findStatusById: vi.fn(),
    updateContainerStatus: vi.fn(),
  };

  const terminalServiceMock = { validateTerminal: vi.fn() };

  const sendPendingDocumentationEvent = {
    sendPendingDocumentationEvent: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContainerService,
        {
          provide: IContainerRepository,
          useValue: containerRepositoryMock,
        },
        {
          provide: TerminalService,
          useValue: terminalServiceMock,
        },
        {
          provide: ContainerProducer,
          useValue: sendPendingDocumentationEvent,
        },
      ],
    }).compile();

    service = module.get<ContainerService>(ContainerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
