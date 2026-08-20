import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { KafkaConfig } from './kafka/config';
import { KAFKA_CLIENTS } from '@/domain/constants/kafka';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      { name: KAFKA_CLIENTS.TERMINAL_SERVICE, ...KafkaConfig },
    ]),
  ],
  providers: [],
  exports: [],
})
export class MessagingModule {}
