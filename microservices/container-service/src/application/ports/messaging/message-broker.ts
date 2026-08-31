export interface MessageBrokerProducerContract {
  produce<P>(topic: string, key: string, payload: P): Promise<void>
}

export const MESSAGE_BROKER_PRODUCER_CONTRACT = Symbol(
  'MessageBrokerProducerContract',
)
