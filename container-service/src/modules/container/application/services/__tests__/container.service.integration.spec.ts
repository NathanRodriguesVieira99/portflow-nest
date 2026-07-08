import { Test, TestingModule } from '@nestjs/testing';
import { TerminalService } from '../terminal.service';
import { ContainerService } from '../container.service';
import { ContainerRepositoryContract } from '../../../domain/repositories/container.repository.contract';
import { ContainerRepositoryImplementation } from '../../../infrastructure/repositories/container.repository.implementation';
import { KafkaModule } from '../../../../../infrastructure/kafka/kafka.module';
import { ClsModule } from '../../../../../infrastructure/observability/cls/cls.module';
import { ContainerProducer } from '../../../infrastructure/events/container.producer';
import { PrismaService } from '../../../../../infrastructure/database/prisma/prisma.service';

describe('ContainerService', () => {
  let service: ContainerService;

  const terminalServiceMock = { validateTerminal: vi.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KafkaModule, ClsModule],
      providers: [
        PrismaService,
        ContainerService,
        ContainerRepositoryImplementation,
        ContainerProducer,
        {
          provide: ContainerRepositoryContract,
          useExisting: ContainerRepositoryImplementation,
        },
        {
          provide: TerminalService,
          useValue: terminalServiceMock,
        },
      ],
    }).compile();

    service = module.get<ContainerService>(ContainerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
