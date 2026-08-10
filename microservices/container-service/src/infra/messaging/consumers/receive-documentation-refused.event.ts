import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { KAFKA_TOPICS } from '@/domain/constants/kafka';
import type { ContainerStatusEvent } from '../producers/send-pending-documentation.event';

@Controller()
export class ReceiveDocumentationRefusedEvent {
  private logger = new Logger(ReceiveDocumentationRefusedEvent.name);

  @EventPattern(KAFKA_TOPICS.DOCUMENTATION_REFUSED)
  receiveDocumentationRefused(event: ContainerStatusEvent) {
    this.logger.log('Documentation Refused!');
    this.logger.log(event);
  }
}
