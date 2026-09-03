import sinon from 'sinon';
import { ClsService } from 'nestjs-cls';
import { ClientKafka } from '@nestjs/microservices';
import { kafkaConfig } from '@/external/messaging/messaging.module';
import { KafkaProducer } from '@/external/messaging/kafka/producers/producer';
import { KAFKA_TOPICS } from '@/external/messaging/kafka/constants';
import { EventBuilder } from '@/external/messaging/kafka/producers/event-builder';
import { RegisterContainerArrivalUseCase } from '@/application/usecases/container/register-container-arrival';
import { Http } from '@/domain/types/http';
import type { MessageBrokerProducerContract } from '@/application/ports/messaging/message-broker';
import type { ContainerStatusEvent } from '@/application/events/container-status.event';
import type { SendPendingDocumentationEventContract } from '@/application/events/send-pending-documentation.event.contract';
import type { ContainerRepository } from '@/application/repositories/container.repository';
import type {
  TerminalHttpContract,
  TerminalValidation,
} from '@/application/ports/http/validate-terminal';
import { PrismaContainerRepositoryFake } from '../../../../mocks/container.repository.fake';

describe('Register Container Arrival', () => {
  let kafkaClient: ClientKafka;
  let sendPendingDocumentationEvent: SendPendingDocumentationEventContract;
  let producer: MessageBrokerProducerContract;
  let eventBuilder: EventBuilder;
  let repo: ContainerRepository;
  let terminal: TerminalHttpContract;
  let useCase: RegisterContainerArrivalUseCase;

  beforeAll(async () => {
    const brokers = process.env.KAFKA_BROKERS?.split(',')!;

    kafkaClient = new ClientKafka({
      ...kafkaConfig.options,
      client: { ...kafkaConfig.options?.client, brokers },
    });

    await kafkaClient.connect();

    producer = new KafkaProducer(kafkaClient);
  }, 60000);

  beforeEach(async () => {
    repo = new PrismaContainerRepositoryFake();

    eventBuilder = new EventBuilder({
      getId: (): string => 'fake-correlation-id',
    } as ClsService);

    sendPendingDocumentationEvent = {
      sendPendingDocumentationEvent: async (containerId) => {
        const event = eventBuilder.build<ContainerStatusEvent>(
          'container-service',
          {
            containerId,
            previousStatus: 'ARRIVED',
            currentStatus: 'PENDING_DOCUMENTATION',
            description: `The container ${containerId} is waiting the documentation`,
          },
        );
        await producer.produce(
          KAFKA_TOPICS.PENDING_DOCUMENTATION,
          containerId,
          event,
        );
      },
    };

    terminal = {
      validateTerminal: sinon
        .stub<[TerminalValidation.Input], Promise<TerminalValidation.Output>>()
        .resolves({
          ok: true,
          value: {
            status: Http.Codes.OK,
            data: {
              terminalId: 'T-001',
              exists: true,
              isActive: true,
              isCargoTypeAccepted: true,
              availableCapacity: true,
              isTerminalValid: true,
              message: 'any message',
            },
          },
        }),
    };

    useCase = new RegisterContainerArrivalUseCase(
      repo,
      sendPendingDocumentationEvent,
      terminal,
    );
  });

  afterAll(async () => {
    await kafkaClient?.close();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });
});
