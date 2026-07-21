import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext } from '@nestjs/microservices';
import { ClsService } from 'nestjs-cls';
import { context, propagation } from '@opentelemetry/api';
import { KAFKA_TOPICS } from '@Shared/constants/kafka';

import type { ContainerStatusEvent } from '../../contracts/container.events';

@Controller()
export class ReceiveDocumentationRefusedEvent {
  private logger = new Logger(ReceiveDocumentationRefusedEvent.name);

  constructor(private readonly cls: ClsService) {}

  @EventPattern(KAFKA_TOPICS.DOCUMENTATION_REFUSED)
  receiveDocumentationRefused(
    event: ContainerStatusEvent,
    @Ctx() kafkaContext: KafkaContext,
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
