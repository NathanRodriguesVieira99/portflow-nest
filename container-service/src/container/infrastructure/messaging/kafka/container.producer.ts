import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { env } from '@Shared/env';
import { KAFKA_TOPICS } from '@/infrastructure/messaging/kafka/constants/topics';
import { KafkaProducer } from '@/infrastructure/messaging/kafka/producer/kafka.producer';

import type { ContainerStatusEvent } from '@Events/container.events';
import type { StatusContainer } from '@Types/status-container.type';

@Injectable()
export class ContainerProducer {
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
      eventId: randomUUID(),
      containerId,
      previousStatus,
      currentStatus,
      description,
      origin: env.SERVICE_NAME ?? 'container-service',
      dateTime: new Date(),
      correlationId: this.cls.getId(),
    };
  }

  async sendPendingDocumentationEvent(containerId: string): Promise<void> {
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
