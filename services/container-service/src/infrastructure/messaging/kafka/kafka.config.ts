import { Transport, type KafkaOptions } from '@nestjs/microservices';

import { KAFKA_CLIENTS } from './constants/clients';
import { KAFKA_CONSUMER_GROUPS } from './constants/groups';

import { env } from '../../../config/env';

export const kafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: KAFKA_CLIENTS.CONTAINER_SERVICE,
      brokers: [env.KAFKA_BROKER],
    },
    consumer: {
      groupId: KAFKA_CONSUMER_GROUPS.CONTAINER_SERVICE,
      allowAutoTopicCreation: false,
    },
  },
};
