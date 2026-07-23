import { Module } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { ContainerController } from '@/container/presentation/controllers/container/container.controller';
import { HealthcheckController } from '@/container/presentation/controllers/healthcheck/healthcheck.controller';
import { ContainerService } from '@/container/application/services/container/container.service';
import { HttpClient } from '@Infra/http/clients/http-client';
import { TerminalHttp } from '@Infra/http/terminal/terminal.http';
import { Resilience } from '@/container/infrastructure/resilience';
import { ContainerRepositoryContract } from '@Infra/persistence/repositories/prisma/container.repository.contract';
import { ContainerRepositoryImplementation } from '@Infra/persistence/repositories/prisma/container.repository.implementation';
import { SendPendingDocumentationEvent } from '@Infra/messaging/events/producers/send-pending-documentation.event';
import { ReceiveDocumentationRefusedEvent } from '@Infra/messaging/events/consumers/receive-documentation-refused.event';
import { ReceiveDocumentationReleasedEvent } from '@Infra/messaging/events/consumers/receive-documentation-released.event';

@Module({
  providers: [
    ContainerService,
    TerminalHttp,
    SendPendingDocumentationEvent,
    {
      provide: HttpClient,
      useFactory: (cls: ClsService) => HttpClient.create(cls),
      inject: [ClsService],
    },
    {
      provide: Resilience,
      useFactory: () => Resilience.create(),
    },
    {
      provide: ContainerRepositoryContract,
      useClass: ContainerRepositoryImplementation,
    },
  ],
  controllers: [
    ContainerController,
    HealthcheckController,
    ReceiveDocumentationRefusedEvent,
    ReceiveDocumentationReleasedEvent,
  ],
})
export class ContainerModule {}
