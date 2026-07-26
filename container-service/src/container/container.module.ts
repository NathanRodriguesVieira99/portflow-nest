import { Module } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { ContainerService } from '@/container/application/services/container/container.service';
import { ContainerController } from '@/container/presentation/controllers/container/container.controller';
import { HealthcheckController } from '@/container/presentation/controllers/healthcheck/healthcheck.controller';
import { TerminalHttp } from '@Infra/http/terminal/terminal.http';
import { CONTAINER_REPOSITORY_CONTRACT } from '@Infra/persistence/repositories/prisma/container.repository.contract';
import { ContainerRepositoryImplementation } from '@Infra/persistence/repositories/prisma/container.repository.implementation';
import { SendPendingDocumentationEvent } from '@Infra/messaging/events/producers/send-pending-documentation.event';
import { ReceiveDocumentationRefusedEvent } from '@Infra/messaging/events/consumers/receive-documentation-refused.event';
import { ReceiveDocumentationReleasedEvent } from '@Infra/messaging/events/consumers/receive-documentation-released.event';
import { HTTP_CLIENT, AxiosAdapter } from '@Infra/http/';
import { RESILIENCE, CockatielAdapter } from './infrastructure/resilience';

@Module({
  providers: [
    ContainerService,
    TerminalHttp,
    SendPendingDocumentationEvent,
    {
      provide: HTTP_CLIENT,
      inject: [ClsService],
      useFactory: (cls: ClsService) => AxiosAdapter.create(cls),
    },
    {
      provide: RESILIENCE,
      useFactory: () => CockatielAdapter.create(),
    },
    {
      provide: CONTAINER_REPOSITORY_CONTRACT,
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
