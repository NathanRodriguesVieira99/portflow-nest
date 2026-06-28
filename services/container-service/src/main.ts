import './tracing';

import { NestFactory } from '@nestjs/core';
import { Logger as PinoLogger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { kafkaConfig } from './infrastructure/kafka/kafka.config';
import { env } from './config/env';

import type { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.setGlobalPrefix('/api/v1');

  /* Logs */
  app.useLogger(app.get(PinoLogger));

  /*  Kafka */
  app.connectMicroservice<MicroserviceOptions>(kafkaConfig);
  await app.startAllMicroservices();

  /* App */
  await app.listen(env.PORT, '0.0.0.0');
}
bootstrap().catch((err) => {
  console.error(`Error when start Container Service: ${err}`);
  process.exit(1);
});
