import { Module } from '@nestjs/common';
import {
  ClientsModule,
  type KafkaOptions,
  Transport,
} from '@nestjs/microservices';
import { SEND_DOCUMENTATION_EVENT_CONTRACT } from '@/application/events/send-pending-documentation.event.contract';
import { env } from '@/external/env';
import {
  KAFKA_CLIENTS,
  KAFKA_CONSUMER_GROUPS,
} from '@/external/messaging/kafka/constants';
import { MESSAGE_BROKER_PRODUCER_CONTRACT } from '@/application/ports/messaging/message-broker';
import { ReceiveDocumentationRefusedEvent } from './kafka/consumers/receive-documentation-refused.event';
import { ReceiveDocumentationReleasedEvent } from './kafka/consumers/receive-documentation-released.event';
import { EventBuilder } from './kafka/producers/event-builder';
import { SendPendingDocumentationEvent } from './kafka/producers/events/send-pending-documentation.event';
import { KafkaProducer } from './kafka/producers/producer';

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
    {
      provide: SEND_DOCUMENTATION_EVENT_CONTRACT,
      useClass: SendPendingDocumentationEvent,
    },
    EventBuilder,
    SendPendingDocumentationEvent,
  ],
  controllers: [
    ReceiveDocumentationRefusedEvent,
    ReceiveDocumentationReleasedEvent,
  ],
  exports: [
    KafkaProducer,
    EventBuilder,
    SendPendingDocumentationEvent,
    SEND_DOCUMENTATION_EVENT_CONTRACT,
  ],
})
export class MessagingModule {}
