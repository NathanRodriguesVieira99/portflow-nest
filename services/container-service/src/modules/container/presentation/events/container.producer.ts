import { randomUUID } from 'node:crypto';

import { Injectable } from '@nestjs/common';

import { PinoLogger } from 'nestjs-pino';
import { ClsService } from 'nestjs-cls';

import { KafkaProducer } from '@/infrastructure/messaging/kafka/producer/kafka.producer';
import { KAFKA_TOPICS } from '@/infrastructure/messaging/kafka/constants/topics';

import { trace } from '@opentelemetry/api';

import type { StatusContainer } from '../../@types/status-container';

export interface ContainerStatusEvent {
  eventId: string;
  containerId: string;
  previousStatus: string;
  currentStatus: string;
  description: string;
  origin: string;
  dateTime: Date;
  correlationId: string;
}

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
    const span = trace.getActiveSpan();
    const spanContext = span?.spanContext();

    const event = this.buildEvent(
      containerId,
      'ARRIVED',
      'PENDING_DOCUMENTATION',
      `The container ${containerId} is waiting the documentation`,
    );

    this.logger.info(
      {
        correlationId: this.cls.getId(),
        traceId: spanContext?.traceId,
        spanId: spanContext?.spanId,
        event,
      },
      'sending event to Kafka',
    );

    await this.kafka.produce(KAFKA_TOPICS.PENDING_DOCUMENTATION, event);
  }
}
