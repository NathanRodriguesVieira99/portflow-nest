import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { KAFKA_CLIENTS } from '@/infrastructure/messaging/kafka/constants/clients';

import type { ClientKafka } from '@nestjs/microservices';
import type { IKafkaProducer } from '@/infrastructure/messaging/kafka/producer/kafka.producer.contract';

@Injectable()
export class KafkaProducer implements IKafkaProducer {
  constructor(
    @Inject(KAFKA_CLIENTS.CONTAINER_SERVICE)
    private readonly kafka: ClientKafka,
  ) {}

  async produce<P>(topic: string, payload: P): Promise<void> {
    await lastValueFrom(this.kafka.emit(topic, payload));
  }
}
