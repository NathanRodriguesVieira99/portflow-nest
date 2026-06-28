import { Module } from '@nestjs/common';

import { ContainerController } from './presentation/controllers/container.controller';
import { HealthcheckController } from './presentation/controllers/healthcheck.controller';

import { ContainerService } from './application/services/container.service';
import { TerminalService } from './application/services/terminal.service';

import { TerminalHttp } from './infra/http/terminal/terminal.http';

import { ContainerProducer } from './presentation/events/container.producer';
import { ContainerConsumer } from './presentation/events/container.consumer';

import { ContainerRepositoryContract } from './domain/repositories/container.repository.contract';
import { ContainerRepositoryImplementation } from './infra/repositories/container.repository.implementation';

@Module({
  providers: [
    /* Services */
    ContainerService,
    TerminalService,

    /* HTTP */
    TerminalHttp,

    /* Kafka */
    ContainerProducer,

    /* Repositories */
    {
      provide: ContainerRepositoryContract,
      useClass: ContainerRepositoryImplementation,
    },
  ],
  controllers: [
    /* Business Logic */
    ContainerController,
    HealthcheckController,

    /* Kafka */
    ContainerConsumer,
  ],
})
export class ContainerModule {}
