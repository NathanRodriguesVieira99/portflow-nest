import { PinoLogger } from 'nestjs-pino';
import { KafkaContainer, StartedKafkaContainer } from '@testcontainers/kafka';

const logger = new PinoLogger({ renameContext: 'Setup Kafka' });

export let kafka: StartedKafkaContainer;

export const setupKafka = async () => {
  kafka = await new KafkaContainer('confluentinc/cp-kafka:7.8.0')
    .withKraft()
    .start();

  process.env.KAFKA_BROKER = `${kafka.getHost()}:${kafka.getMappedPort(9093)}`;

  logger.info('Kafka connected!');
};

export const disconnectKafka = async () => {
  await kafka.stop();
  logger.info('Kafka disconnected!');
};
