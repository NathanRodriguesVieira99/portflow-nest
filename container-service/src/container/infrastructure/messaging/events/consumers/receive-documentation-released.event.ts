import { Ctx, EventPattern, type KafkaContext } from '@nestjs/microservices';
import { KAFKA_TOPICS } from '@Shared/constants/kafka';
import { ClsService } from 'nestjs-cls';
import { context, propagation } from '@opentelemetry/api';

import type { ContainerStatusEvent } from '../../contracts/container.events';
import { Controller, Logger } from '@nestjs/common';

@Controller()
export class ReceiveDocumentationReleasedEvent {
  private logger = new Logger(ReceiveDocumentationReleasedEvent.name);

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
}
