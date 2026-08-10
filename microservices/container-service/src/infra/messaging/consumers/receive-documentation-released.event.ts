import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { KAFKA_TOPICS } from '@/domain/constants/kafka';
import type { ContainerStatusEvent } from '../producers/send-pending-documentation.event';

@Controller()
export class ReceiveDocumentationReleasedEvent {
  private logger = new Logger(ReceiveDocumentationReleasedEvent.name);

  @EventPattern(KAFKA_TOPICS.DOCUMENTATION_RELEASED)
  receiveDocumentationReleased(event: ContainerStatusEvent) {
    this.logger.log('Documentation Received!');
    this.logger.log(event);
  }
}
