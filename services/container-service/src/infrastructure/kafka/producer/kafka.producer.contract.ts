export interface IKafkaProducer {
  produce<P>(topic: string, key: string, payload: P): Promise<void>;
}
