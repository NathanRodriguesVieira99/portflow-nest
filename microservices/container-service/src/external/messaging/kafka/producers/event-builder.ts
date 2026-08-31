import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { ClsService } from 'nestjs-cls';
import type { Event } from '@/application/events/event';

@Injectable()
export class EventBuilder {
  constructor(private readonly cls: ClsService) {}

  build<P>(origin: string, payload: P): Event<P> {
    return {
      meta: {
        eventId: nanoid(),
        correlationId: this.cls.getId(),
        origin,
        occurredAt: new Date(),
      },
      payload,
    };
  }
}
