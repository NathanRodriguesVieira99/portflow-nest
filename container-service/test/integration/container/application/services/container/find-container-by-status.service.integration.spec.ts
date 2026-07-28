import { Test, TestingModule } from '@nestjs/testing';
import { FindContainerByStatusService } from '@/container/application/services/container/find-container-by-status.service';
import { ClsModule } from '@Infra/observability/cls.module';
import { SendPendingDocumentationEvent } from '@Infra/messaging/events/producers/send-pending-documentation.event';
import { TerminalHttp } from '@Infra/http/terminal/terminal.http';
import { KafkaModule } from '@Infra/messaging/kafka.module';
import { PrismaService } from '@Infra/persistence/database/prisma/prisma.service';
import { AxiosAdapter } from '@/container/infrastructure/http/adapters/axios.adapter';
import { ContainerRepositoryImplementation } from '@Infra/persistence/repositories/prisma/container.repository.implementation';
import { CONTAINER_REPOSITORY_CONTRACT } from '@Infra/persistence/repositories/prisma/container.repository.contract';

describe('ContainerService', () => {
  let service: FindContainerByStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KafkaModule, ClsModule],
      providers: [
        PrismaService,
        FindContainerByStatusService,
        SendPendingDocumentationEvent,
        TerminalHttp,
        AxiosAdapter,
        ContainerRepositoryImplementation,
        {
          provide: CONTAINER_REPOSITORY_CONTRACT,
          useExisting: ContainerRepositoryImplementation,
        },
      ],
    }).compile();

    service = module.get<FindContainerByStatusService>(
      FindContainerByStatusService,
    );
  });

  it.todo('should be defined', () => {
    expect(service).toBeDefined();
  });
});
