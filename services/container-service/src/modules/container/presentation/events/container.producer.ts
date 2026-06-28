import { randomUUID } from 'node:crypto';

import { Injectable } from '@nestjs/common';

import { PinoLogger } from 'nestjs-pino';
import { ClsService } from 'nestjs-cls';

import { KAFKA_TOPICS } from '../../../../infrastructure/kafka/constants/topics';
import { KafkaProducer } from '../../../../infrastructure/kafka/producer/kafka.producer';

import type { StatusContainer } from '../../@types/status-container';
import type { ContainerStatusEvent } from './contracts/container.events';

@Injectable()
export class ContainerProducer {
  constructor(
    private readonly kafka: KafkaProducer,
    private readonly cls: ClsService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(ContainerProducer.name);
  }

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

    this.logger.info({ event }, 'sending event to Kafka');

    await this.kafka.produce(KAFKA_TOPICS.PENDING_DOCUMENTATION, event);
  }
}
