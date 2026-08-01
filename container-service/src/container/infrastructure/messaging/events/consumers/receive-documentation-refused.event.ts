import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { KAFKA_TOPICS } from '@Shared/constants/kafka';

import type { ContainerStatusEvent } from '../../contracts/container.events';

@Controller()
export class ReceiveDocumentationRefusedEvent {
  private logger = new Logger(ReceiveDocumentationRefusedEvent.name);

  @EventPattern(KAFKA_TOPICS.DOCUMENTATION_REFUSED)
  receiveDocumentationRefused(event: ContainerStatusEvent) {
    this.logger.log('Documentation Refused!');
    this.logger.log(event);
  }
}
