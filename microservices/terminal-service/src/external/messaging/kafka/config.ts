import { Transport, type KafkaOptions } from '@nestjs/microservices';
import { KAFKA_CLIENTS, KAFKA_CONSUMER_GROUPS } from '@/domain/constants/kafka';
import { env } from '@/config/env';

export const KafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: KAFKA_CLIENTS.TERMINAL_SERVICE,
      brokers: [env.KAFKA_BROKER],
    },
    consumer: {
      groupId: KAFKA_CONSUMER_GROUPS.TERMINAL_SERVICE,
      allowAutoTopicCreation: true,
    },
  },
};
