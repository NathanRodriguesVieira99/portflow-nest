import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ClsService } from 'nestjs-cls';
import { KAFKA_CLIENTS } from '../constants/clients';
import { context, propagation } from '@opentelemetry/api';

import type { ClientKafka } from '@nestjs/microservices';
import type { IKafkaProducer } from '../producer/kafka.producer.contract';

@Injectable()
export class KafkaProducer implements IKafkaProducer {
  constructor(
    @Inject(KAFKA_CLIENTS.CONTAINER_SERVICE)
    private readonly kafka: ClientKafka,
    private readonly cls: ClsService,
  ) {}

  async produce<P>(topic: string, key: string, payload: P): Promise<void> {
    const otelHeaders: Record<string, string> = {};

    propagation.inject(context.active(), otelHeaders);

    const headers = {
      ...otelHeaders,
      'x-correlation-id': this.cls.getId() ?? '',
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
