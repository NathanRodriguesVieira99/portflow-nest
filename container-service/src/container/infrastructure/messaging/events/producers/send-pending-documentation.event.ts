import { Injectable } from '@nestjs/common';
import { EventBuilder } from '../build-event';
import { KAFKA_TOPICS } from '@Shared/constants/kafka';
import { env } from '@Shared/env';

import type { ContainerStatusEvent } from '../../contracts/container.events';
import type { MessageBrokerProducerContract } from '../../contracts/message-broker.contract';

@Injectable()
export class SendPendingDocumentationEvent {
  constructor(
    private readonly kafka: MessageBrokerProducerContract,
    private readonly event: EventBuilder,
  ) {}

  async sendPendingDocumentation(containerId: string): Promise<void> {
    const event = this.event.build<ContainerStatusEvent>(
      env.SERVICE_NAME ?? 'container-service',
      {
        containerId,
        previousStatus: 'ARRIVED',
        currentStatus: 'PENDING_DOCUMENTATION',
        description: `The container ${containerId} is waiting the documentation`,
      },
    );

    await this.kafka.produce(
      KAFKA_TOPICS.PENDING_DOCUMENTATION,
      containerId,
      event,
    );
  }
}
