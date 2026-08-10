import { Module } from '@nestjs/common';
import {
  ClientsModule,
  Transport,
  type KafkaOptions,
} from '@nestjs/microservices';
import { KafkaProducer } from './producers/producer';
import { EventBuilder } from './producers/event-builder';
import { SendPendingDocumentationEvent } from './producers/send-pending-documentation.event';
import { ReceiveDocumentationRefusedEvent } from './consumers/receive-documentation-refused.event';
import { ReceiveDocumentationReleasedEvent } from './consumers/receive-documentation-released.event';
import { env } from '@/config/env';
import { KAFKA_CLIENTS, KAFKA_CONSUMER_GROUPS } from '@/domain/constants/kafka';
import { MESSAGE_BROKER_PRODUCER_CONTRACT } from '@/application/messaging/message-broker';

export const kafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: KAFKA_CLIENTS.CONTAINER_SERVICE,
      brokers: [env.KAFKA_BROKER],
    },
    consumer: {
      groupId: KAFKA_CONSUMER_GROUPS.CONTAINER_SERVICE,
      allowAutoTopicCreation: true,
    },
  },
};
@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_CLIENTS.CONTAINER_SERVICE,
        ...kafkaConfig,
      },
    ]),
  ],
  providers: [
    KafkaProducer,
    {
      provide: MESSAGE_BROKER_PRODUCER_CONTRACT,
      useClass: KafkaProducer,
    },
    EventBuilder,
    SendPendingDocumentationEvent,
  ],
  controllers: [
    ReceiveDocumentationRefusedEvent,
    ReceiveDocumentationReleasedEvent,
  ],
  exports: [KafkaProducer, EventBuilder, SendPendingDocumentationEvent],
})
export class MessagingModule {}
