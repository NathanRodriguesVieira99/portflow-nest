import { Module } from '@nestjs/common';

import { ContainerController } from '@/container/presentation/controllers/container/container.controller';
import { HealthcheckController } from '@/container/presentation/controllers/healthcheck/healthcheck.controller';

import { ContainerService } from '@/container/application/services/container/container.service';
import { TerminalService } from '@/container/application/services/terminal/terminal.service';

import { TerminalHttp } from '@/container/infrastructure/http/terminal/terminal.http';

import { ContainerRepositoryContract } from '@Infra/persistence/repositories/prisma/container.repository.contract';
import { ContainerRepositoryImplementation } from '@Infra/persistence/repositories/prisma/container.repository.implementation';

import { SendPendingDocumentationEvent } from '@Infra/messaging/events/producers/send-pending-documentation.event';
import { ReceiveDocumentationRefusedEvent } from '@Infra/messaging/events/consumers/receive-documentation-refused.event';
import { ReceiveDocumentationReleasedEvent } from '@Infra/messaging/events/consumers/receive-documentation-released.event';

@Module({
  providers: [
    ContainerService,
    TerminalService,
    TerminalHttp,
    SendPendingDocumentationEvent,
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
