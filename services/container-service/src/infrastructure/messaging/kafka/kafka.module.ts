import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { kafkaConfig } from './kafka.config';
import { KAFKA_CLIENTS } from './constants/clients';
import { KafkaProducer } from './producer/kafka.producer';

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
