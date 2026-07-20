import { Module } from '@nestjs/common';
import { ContainerController } from '@Controllers/container.controller';
import { HealthcheckController } from '@Controllers/healthcheck.controller';
import { ContainerService } from '@Services/container.service';
import { TerminalService } from '@Services/terminal.service';
import { TerminalHttp } from '@Infra/http/terminal.http';
import { ContainerProducer } from '@Infra/messaging/kafka/container.producer';
import { ContainerConsumer } from '@Infra/messaging/kafka/container.consumer';
import { ContainerRepositoryContract } from '@Infra/repositories/prisma/container.repository.contract';
import { ContainerRepositoryImplementation } from '@Infra/repositories/prisma/container.repository.implementation';

@Module({
  providers: [
    ContainerService,
    TerminalService,
    TerminalHttp,
    ContainerProducer,
    {
      provide: ContainerRepositoryContract,
      useClass: ContainerRepositoryImplementation,
    },
  ],
  controllers: [ContainerController, HealthcheckController, ContainerConsumer],
})
export class ContainerModule {}
