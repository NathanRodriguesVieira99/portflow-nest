export interface IKafkaProducer {
  produce<P>(topic: string, payload: P): Promise<void>;
}
