import { Test, TestingModule } from '@nestjs/testing';
import { TerminalService } from '@Services/terminal/terminal.service';
import { ContainerService } from '@Services/container/container.service';
import { ClsModule } from '@Infra/observability/cls.module';
import { SendPendingDocumentationEvent } from '@Infra/messaging/events/producers/send-pending-documentation.event';
import { TerminalHttp } from '@Infra/http/terminal/terminal.http';
import { KafkaModule } from '@Infra/messaging/kafka.module';
import { PrismaService } from '@Infra/persistence/database/prisma/prisma.service';
import { HttpClient } from '@/container/infrastructure/http/clients/http-client';
import { ContainerRepositoryImplementation } from '@Infra/persistence/repositories/prisma/container.repository.implementation';
import { ContainerRepositoryContract } from '@Infra/persistence/repositories/prisma/container.repository.contract';

describe('ContainerService', () => {
  let service: ContainerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KafkaModule, ClsModule],
      providers: [
        PrismaService,
        ContainerService,
        SendPendingDocumentationEvent,
        TerminalService,
        TerminalHttp,
        HttpClient,
        ContainerRepositoryImplementation,
        {
          provide: ContainerRepositoryContract,
          useExisting: ContainerRepositoryImplementation,
        },
      ],
    }).compile();

    service = module.get<ContainerService>(ContainerService);
  });

  it.todo('should be defined', () => {
    expect(service).toBeDefined();
  });
});
