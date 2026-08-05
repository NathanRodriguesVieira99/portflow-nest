import { KafkaContainer, StartedKafkaContainer } from '@testcontainers/kafka';

export let kafka: StartedKafkaContainer;

export const setupKafka = async () => {
  kafka = await new KafkaContainer('confluentinc/cp-kafka:7.8.0')
    .withKraft()
    .start();
  process.env.KAFKA_BROKER = `${kafka.getHost()}:${kafka.getMappedPort(9093)}`;
};

export const disconnectKafka = async () => {
  await kafka.stop();
};
