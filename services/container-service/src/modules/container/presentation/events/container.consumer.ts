import { Injectable, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { KAFKA_TOPICS } from '@/infrastructure/messaging/kafka/constants/topics';

import type { ContainerStatusEvent } from './container.producer';

@Injectable()
export class ContainerConsumer {
  private logger = new Logger(ContainerConsumer.name);

  @MessagePattern(KAFKA_TOPICS.DOCUMENTATION_RELEASED)
  receiveDocumentationReleased(event: ContainerStatusEvent) {
    this.logger.log('Event Received!');
    this.logger.log(event);
  }

  @MessagePattern(KAFKA_TOPICS.DOCUMENTATION_REFUSED)
  receiveDocumentationRefused(event: ContainerStatusEvent) {
    this.logger.log('Event Refused!');
    this.logger.log(event);
  }
}
