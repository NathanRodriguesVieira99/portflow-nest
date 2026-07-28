import { Module } from '@nestjs/common';

import { ClsService } from 'nestjs-cls';

import { FindContainerByStatusService } from '@/container/application/services/container/find-container-by-status.service';
import { UpdateContainerStatusService } from './application/services/container/update-container-status.service';
import { RegisterContainerArrivalService } from './application/services/container/register-container-arrival.service';
import { RemoveContainerService } from './application/services/container/remove-container.service';
import { FindContainerByIdService } from './application/services/container/find-container-by-id.service';
import { FindAllContainersService } from './application/services/container/find-all-containers.service';

import { ContainerController } from '@/container/presentation/controllers/container/container.controller';
import { HealthcheckController } from '@/container/presentation/controllers/healthcheck/healthcheck.controller';

import { TerminalHttp } from '@Infra/http/terminal/terminal.http';

import { CONTAINER_REPOSITORY_CONTRACT } from '@Infra/persistence/repositories/prisma/container.repository.contract';
import { ContainerRepositoryImplementation } from '@Infra/persistence/repositories/prisma/container.repository.implementation';
import { HTTP_CLIENT, AxiosAdapter } from '@Infra/http/';
import { RESILIENCE, CockatielAdapter } from './infrastructure/resilience';

import { SendPendingDocumentationEvent } from '@Infra/messaging/events/producers/send-pending-documentation.event';
import { ReceiveDocumentationRefusedEvent } from '@Infra/messaging/events/consumers/receive-documentation-refused.event';
import { ReceiveDocumentationReleasedEvent } from '@Infra/messaging/events/consumers/receive-documentation-released.event';

@Module({
  providers: [
    RegisterContainerArrivalService,
    UpdateContainerStatusService,
    RemoveContainerService,
    FindContainerByIdService,
    FindAllContainersService,
    FindContainerByStatusService,
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
