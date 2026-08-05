import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { KAFKA_CLIENTS } from '@Shared/constants/kafka';
import { MESSAGE_BROKER_PRODUCER_CONTRACT } from './contracts/message-broker.contract';
import { kafkaConfig } from './kafka/kafka.config';
import { KafkaProducer } from './kafka/kafka.producer';
import { EventBuilder } from './events/build-event';
import { SendPendingDocumentationEvent } from './events/producers/send-pending-documentation.event';
import { ReceiveDocumentationRefusedEvent } from '@Infra/messaging/events/consumers/receive-documentation-refused.event';
import { ReceiveDocumentationReleasedEvent } from '@Infra/messaging/events/consumers/receive-documentation-released.event';

@Global()
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
    {
      provide: MESSAGE_BROKER_PRODUCER_CONTRACT,
      useClass: KafkaProducer,
    },
    KafkaProducer,
    EventBuilder,
    SendPendingDocumentationEvent,
  ],
  exports: [KafkaProducer, EventBuilder, SendPendingDocumentationEvent],
  controllers: [
    ReceiveDocumentationRefusedEvent,
    ReceiveDocumentationReleasedEvent,
  ],
})
export class KafkaModule {}
