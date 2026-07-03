import { randomUUID } from 'node:crypto';
import { Injectable, Logger } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { KAFKA_TOPICS } from '../../../../infrastructure/kafka/constants/topics';
import { KafkaProducer } from '../../../../infrastructure/kafka/producer/kafka.producer';

import type { ContainerStatusEvent } from '../../domain/events/container.events';
import type { StatusContainer } from '../../domain/types/status-container.type';

@Injectable()
export class ContainerProducer {
  private logger = new Logger(ContainerProducer.name);

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
      origin: 'container-service',
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

    this.logger.log({ event }, 'sending event to Kafka');

    await this.kafka.produce(
      KAFKA_TOPICS.PENDING_DOCUMENTATION,
      containerId,
      event,
    );
  }
}
