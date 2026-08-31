import { Inject, Injectable } from '@nestjs/common';
import { context, propagation } from '@opentelemetry/api';
import { ClsService } from 'nestjs-cls';
import { lastValueFrom } from 'rxjs';
import { KAFKA_CLIENTS } from '@/external/messaging/kafka/constants';
import type { ClientKafka } from '@nestjs/microservices';
import type { MessageBrokerProducerContract } from '@/application/ports/messaging/message-broker';

@Injectable()
export class KafkaProducer implements MessageBrokerProducerContract {
  constructor(
    @Inject(KAFKA_CLIENTS.CONTAINER_SERVICE)
    private readonly kafka: ClientKafka,
    private readonly cls?: ClsService,
  ) {}

  async produce<P>(topic: string, key: string, payload: P): Promise<void> {
    const otelHeaders: Record<string, string> = {};

    propagation.inject(context.active(), otelHeaders);

    const headers = {
      ...otelHeaders,
      'x-correlation-id': this.cls!.getId() ?? '',
    };

    await lastValueFrom(
      this.kafka.emit(topic, {
        key,
        value: payload,
        headers,
      }),
    );
  }
}
