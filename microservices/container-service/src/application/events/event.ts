export type Event<P> = {
  meta: {
    eventId: string
    correlationId: string
    origin: string
    occurredAt: Date
  }
  payload: P
}
