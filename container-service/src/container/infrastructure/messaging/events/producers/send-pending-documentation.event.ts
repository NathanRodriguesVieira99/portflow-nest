import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { nanoid } from 'nanoid';
import { env } from '@Shared/env';
import { KAFKA_TOPICS } from '@Shared/constants/kafka';
import { KafkaProducer } from '@/container/infrastructure/messaging/kafka/kafka.producer';

import type { ContainerStatusEvent } from '@/container/infrastructure/messaging/contracts/container.events';
import type { StatusContainer } from '@Types/status-container.type';

@Injectable()
export class SendPendingDocumentationEvent {
  constructor(
    private readonly kafka: KafkaProducer,
    private readonly cls: ClsService,
  ) {}

  private buildEvent(
    containerId: string,
    previousStatus: StatusContainer,
    currentStatus: StatusContainer,
    description: string,
  ): ContainerStatusEvent {
    return {
      eventId: nanoid(),
      containerId,
      previousStatus,
      currentStatus,
      description,
      origin: env.SERVICE_NAME ?? 'container-service',
      dateTime: new Date(),
      correlationId: this.cls.getId(),
    };
  }

  async sendPendingDocumentation(containerId: string): Promise<void> {
    const event = this.buildEvent(
      containerId,
      'ARRIVED',
      'PENDING_DOCUMENTATION',
      `The container ${containerId} is waiting the documentation`,
    );

    await this.kafka.produce(
      KAFKA_TOPICS.PENDING_DOCUMENTATION,
      containerId,
      event,
    );
  }
}
