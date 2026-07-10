import { Test, TestingModule } from '@nestjs/testing';
import { TerminalService } from '../../../../../src/modules/container/application/services/terminal.service';
import { ContainerService } from '../../../../../src/modules/container/application/services/container.service';
import { ContainerRepositoryContract } from '../../../../../src/modules/container/domain/repositories/container.repository.contract';
import { ContainerRepositoryImplementation } from '../../../../../src/modules/container/infrastructure/repositories/container.repository.implementation';
import { KafkaModule } from '../../../../../src/infrastructure/kafka/kafka.module';
import { ClsModule } from '../../../../../src/infrastructure/observability/cls/cls.module';
import { ContainerProducer } from '../../../../../src/modules/container/infrastructure/events/container.producer';
import { PrismaService } from '../../../../../src/infrastructure/database/prisma/prisma.service';
import { TerminalHttp } from '../../../../../src/modules/container/infrastructure/http/terminal.http';
import { HttpClient } from '../../../../../src/infrastructure/http/http-client';

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
