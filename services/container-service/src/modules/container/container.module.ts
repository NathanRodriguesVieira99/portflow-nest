import { Module } from '@nestjs/common';

import { ContainerController } from './presentation/controllers/container.controller';
import { HealthcheckController } from './presentation/controllers/healthcheck.controller';

import { ContainerService } from './application/services/container.service';
import { TerminalService } from './application/services/terminal.service';

import { TerminalHttp } from './infra/http/terminal.http';

import { ContainerProducer } from './presentation/events/container.producer';
import { ContainerConsumer } from './presentation/events/container.consumer';

import {
  ContainerRepository,
  IContainerRepository,
} from './infra/repositories/container.repository';

@Module({
  providers: [
    /* Services */
    ContainerService,
    TerminalService,

    /* HTTP */
    TerminalHttp,

    /* Kafka */
    ContainerProducer,
    ContainerConsumer,

    /* Repositories */
    { provide: IContainerRepository, useClass: ContainerRepository },
  ],
  controllers: [ContainerController, HealthcheckController],
})
export class ContainerModule {}
