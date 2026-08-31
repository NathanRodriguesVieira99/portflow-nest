import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { KAFKA_TOPICS } from '@/external/messaging/kafka/constants';
import type { ContainerStatusEvent } from '@/application/events/container-status.event';

@Controller()
export class ReceiveDocumentationRefusedEvent {
  private logger = new Logger(ReceiveDocumentationRefusedEvent.name);

  @EventPattern(KAFKA_TOPICS.DOCUMENTATION_REFUSED)
  receiveDocumentationRefused(event: ContainerStatusEvent) {
    this.logger.log('Documentation Refused!');
    this.logger.log(event);
  }
}
