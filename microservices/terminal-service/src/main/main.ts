import '../infra/tracing/tracing';

import { NestFactory } from '@nestjs/core';
import { Logger as PinoLogger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { env } from '@/config/env';
import { KafkaConfig } from '@/infra/messaging/config';
import type { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.setGlobalPrefix('api/v1');

  app.useLogger(app.get(PinoLogger));

  app.connectMicroservice<MicroserviceOptions>(KafkaConfig);

  await app.startAllMicroservices();
  await app.listen(env.PORT, '0.0.0.0');
}
bootstrap().catch((err) => {
  console.error(`Error when start Container Service: ${err}`);
  process.exit(1);
});
