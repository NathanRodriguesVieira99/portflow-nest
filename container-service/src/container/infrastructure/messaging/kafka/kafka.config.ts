import { Transport, type KafkaOptions } from '@nestjs/microservices';
import { KAFKA_CLIENTS, KAFKA_CONSUMER_GROUPS } from '@Shared/constants/kafka';
import { env } from '@/shared/env';

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
