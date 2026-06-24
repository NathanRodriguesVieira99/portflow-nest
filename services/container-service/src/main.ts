import './tracing';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger as PinoLogger } from 'nestjs-pino';

import { env } from './config/env';
import type { MicroserviceOptions } from '@nestjs/microservices';
import { kafkaConfig } from './infrastructure/messaging/kafka/kafka.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.setGlobalPrefix('/api/v1');

  /* CORS */
  app.enableCors({
    origin: ['*'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  app.useLogger(app.get(PinoLogger));

  /*  Kafka */
  app.connectMicroservice<MicroserviceOptions>(kafkaConfig);
  await app.startAllMicroservices();

  /* APP */
  await app.listen(env.PORT, '0.0.0.0');
}
bootstrap().catch((err) => {
  console.error(`Error when start Container Service: ${err}`);
  process.exit(1);
});
