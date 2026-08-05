import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { KAFKA_TOPICS } from '@Shared/constants/kafka';

import type { ContainerStatusEvent } from '../../contracts/container.events';

@Controller()
export class ReceiveDocumentationReleasedEvent {
  private logger = new Logger(ReceiveDocumentationReleasedEvent.name);

  @EventPattern(KAFKA_TOPICS.DOCUMENTATION_RELEASED)
  receiveDocumentationReleased(event: ContainerStatusEvent) {
    this.logger.log('Documentation Received!');
    this.logger.log(event);
  }
}
