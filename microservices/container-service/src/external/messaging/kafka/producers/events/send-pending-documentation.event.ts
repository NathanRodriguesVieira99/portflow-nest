import { Inject, Injectable } from '@nestjs/common';
import { env } from '@/external/env';
import { EventBuilder } from '../event-builder';
import { KAFKA_TOPICS } from '@/external/messaging/kafka/constants';
import {
  MESSAGE_BROKER_PRODUCER_CONTRACT,
  type MessageBrokerProducerContract,
} from '@/application/ports/messaging/message-broker';
import type { SendPendingDocumentationEventContract } from '@/application/events/send-pending-documentation.event.contract';
import type { ContainerStatusEvent } from '@/application/events/container-status.event';

@Injectable()
export class SendPendingDocumentationEvent implements SendPendingDocumentationEventContract {
  constructor(
    @Inject(MESSAGE_BROKER_PRODUCER_CONTRACT)
    private readonly kafka: MessageBrokerProducerContract,
    private readonly event: EventBuilder,
  ) {}

  async sendPendingDocumentationEvent(containerId: string): Promise<void> {
    const event = this.event.build<ContainerStatusEvent>(
      env.SERVICE_NAME ?? 'container-service',
      {
        containerId,
        previousStatus: 'ARRIVED',
        currentStatus: 'PENDING_DOCUMENTATION',
        description: `The container ${containerId} is waiting the documentation`,
      },
    );

    await this.kafka.produce<typeof event>(
      KAFKA_TOPICS.PENDING_DOCUMENTATION,
      containerId,
      event,
    );
  }
}
