export interface MessageBrokerProducerContract {
  produce<P>(topic: string, key: string, payload: P): Promise<void>;
}

