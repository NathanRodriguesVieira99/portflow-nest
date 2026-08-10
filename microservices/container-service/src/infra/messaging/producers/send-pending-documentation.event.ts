import { Inject, Injectable } from '@nestjs/common';
import { EventBuilder } from './event-builder';
import { KAFKA_TOPICS } from '@/domain/constants/kafka';
import { env } from '@/config/env';
import type { StatusContainer } from '@/@types/status-container.type';
import {
  MESSAGE_BROKER_PRODUCER_CONTRACT,
  type MessageBrokerProducerContract,
} from '../../../application/messaging/message-broker';

export interface ContainerStatusEvent {
  containerId: string;
  previousStatus: StatusContainer;
  currentStatus: StatusContainer;
  description: string;
}

@Injectable()
export class SendPendingDocumentationEvent {
  constructor(
    @Inject(MESSAGE_BROKER_PRODUCER_CONTRACT)
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
