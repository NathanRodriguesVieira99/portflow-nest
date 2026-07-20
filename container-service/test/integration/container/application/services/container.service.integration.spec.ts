import { Test, TestingModule } from '@nestjs/testing';
import { TerminalService } from '@Services/terminal.service';
import { ContainerService } from '@Services/container.service';
import { ContainerRepositoryContract } from '@Repositories/prisma/container.repository.contract';
import { ContainerRepositoryImplementation } from '@Repositories/prisma/container.repository.implementation';
import { KafkaModule } from '@/infrastructure/messaging/kafka/kafka.module';
import { ClsModule } from '@/infrastructure/observability/cls/cls.module';
import { ContainerProducer } from '@Infra/messaging/kafka/container.producer';
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service';
import { TerminalHttp } from '@Infra/http/terminal.http';
import { HttpClient } from '@/infrastructure/http/http-client';

describe('ContainerService', () => {
  let service: ContainerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [KafkaModule, ClsModule],
      providers: [
        PrismaService,
        ContainerService,
        ContainerProducer,
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
