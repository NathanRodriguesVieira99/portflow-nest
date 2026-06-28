import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { KAFKA_TOPICS } from '../../../../infrastructure/kafka/constants/topics';

import type { ContainerStatusEvent } from './contracts/container.events';

@Controller()
export class ContainerConsumer {
  private logger = new Logger(ContainerConsumer.name);

  @EventPattern(KAFKA_TOPICS.DOCUMENTATION_RELEASED)
  receiveDocumentationReleased(event: ContainerStatusEvent) {
    this.logger.log('Event Received!');
    this.logger.log(event);
  }

  @EventPattern(KAFKA_TOPICS.DOCUMENTATION_REFUSED)
  receiveDocumentationRefused(event: ContainerStatusEvent) {
    this.logger.log('Event Refused!');
    this.logger.log(event);
  }
}
