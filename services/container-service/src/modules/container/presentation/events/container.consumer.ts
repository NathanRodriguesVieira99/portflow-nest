import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext } from '@nestjs/microservices';
import { ClsService } from 'nestjs-cls';
import { context, propagation } from '@opentelemetry/api';
import { KAFKA_TOPICS } from '../../../../infrastructure/kafka/constants/topics';

import type { ContainerStatusEvent } from '../../domain/events/container.events';

@Controller()
export class ContainerConsumer {
  private logger = new Logger(ContainerConsumer.name);

  constructor(private readonly cls: ClsService) {}

  @EventPattern(KAFKA_TOPICS.DOCUMENTATION_RELEASED)
  receiveDocumentationReleased(
    event: ContainerStatusEvent,
    @Ctx() kafkaContext: KafkaContext, // Dá acesso aos metadados da mensagem do kafka (aqui queremos os headers)
  ) {
    const headersComingFromKafka = kafkaContext.getMessage().headers ?? {};

    const parentTraceContext = propagation.extract(
      context.active(),
      headersComingFromKafka,
    );

    context.with(parentTraceContext, () => {
      this.cls.set(
        'x-correlation-id',
        headersComingFromKafka['x-correlation-id'] ?? event.correlationId,
      );
      this.logger.log('Documentation Received!');
      this.logger.log(event);
    });
  }

  @EventPattern(KAFKA_TOPICS.DOCUMENTATION_REFUSED)
  receiveDocumentationRefused(
    @Ctx() kafkaContext: KafkaContext,
    event: ContainerStatusEvent,
  ) {
    const headersComingFromKafka = kafkaContext.getMessage().headers ?? {};

    const parentTraceContext = propagation.extract(
      context.active(),
      headersComingFromKafka,
    );

    context.with(parentTraceContext, () => {
      this.cls.set(
        'x-correlation-id',
        headersComingFromKafka['x-correlation-id'] ?? event.correlationId,
      );
      this.logger.log('Documentation Refused!');
      this.logger.log(event);
    });
  }
}
