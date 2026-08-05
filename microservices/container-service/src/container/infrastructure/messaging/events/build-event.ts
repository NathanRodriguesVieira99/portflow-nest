import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { ClsService } from 'nestjs-cls';

export type Event<P> = {
  meta: {
    eventId: string;
    correlationId: string;
    origin: string;
    occurredAt: Date;
  };
  payload: P;
};

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
