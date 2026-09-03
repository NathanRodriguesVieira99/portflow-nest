import { fakerPT_BR as faker } from '@faker-js/faker';
import { ClientKafka } from '@nestjs/microservices';
import { kafkaConfig } from '@/external/messaging/messaging.module';
import { KafkaProducer } from '@/external/messaging/kafka/producers/producer';
import { KAFKA_TOPICS } from '@/external/messaging/kafka/constants';
import { EventBuilder } from '@/external/messaging/kafka/producers/event-builder';
import { ClsService } from 'nestjs-cls';
import type { MessageBrokerProducerContract } from '@/application/ports/messaging/message-broker';
import type { ContainerStatusEvent } from '@/application/events/container-status.event';

/* 
* Esse teste por enquanto apenas testa se a mensagem foi produzida e se o payload está correto. Talvez eu crie um método para consumir mensagens tipo o .produce()
*/

describe('Producer', async () => {
  let kafkaClient: ClientKafka;
  let producer: MessageBrokerProducerContract;

  beforeAll(async () => {
    const brokers = process.env.KAFKA_BROKERS?.split(',')!;
    kafkaClient = new ClientKafka({
      ...kafkaConfig.options,
      client: { ...kafkaConfig.options?.client, brokers },
    });
    await kafkaClient.connect();

    producer = new KafkaProducer(kafkaClient, {
      getId: (): string => 'fake-correlation-id',
    } as ClsService);
  }, 60000);

  afterAll(async () => {
    await kafkaClient.close();
  });

  it('should produce a message on Kafka', async () => {
    const containerId = faker.string.uuid();

    const eventBuilder = new EventBuilder({
      getId: (): string => 'fake-correlation-id',
    } as ClsService);

    const event = eventBuilder.build<ContainerStatusEvent>(containerId, {
      containerId,
      previousStatus: 'ARRIVED',
      currentStatus: 'PENDING_DOCUMENTATION',
      description: `The container ${containerId} is waiting the documentation`,
    });

    await expect(
      producer.produce(KAFKA_TOPICS.PENDING_DOCUMENTATION, containerId, event),
    ).resolves.toBeUndefined();
    expect(event.payload).toEqual({
      containerId: expect.any(String),
      currentStatus: 'PENDING_DOCUMENTATION',
      description: expect.any(String),
      previousStatus: 'ARRIVED',
    });
  });
});
