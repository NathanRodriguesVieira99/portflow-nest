import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { KAFKA_CLIENTS } from '@Shared/constants/kafka';
import { kafkaConfig } from './kafka/kafka.config';
import { KafkaProducer } from './kafka/kafka.producer';

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
  providers: [KafkaProducer],
  exports: [KafkaProducer],
})
export class KafkaModule {}
