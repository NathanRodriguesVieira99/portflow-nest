import './tracing';

import { NestFactory } from '@nestjs/core';
import { Logger as PinoLogger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { kafkaConfig } from '@Infra/messaging/kafka/kafka.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from '@Shared/env';

import type { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.setGlobalPrefix('/api/v1');

  app.useLogger(app.get(PinoLogger));

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Container Service')
      .setDescription('API documentation for the Container Microservice.')
      .setVersion('1.0')
      .build(),
  );

  SwaggerModule.setup('docs', app, document);


  app.connectMicroservice<MicroserviceOptions>(kafkaConfig);

  await app.startAllMicroservices();

  await app.listen(env.PORT, '0.0.0.0');
}
bootstrap().catch((err) => {
  console.error(`Error when start Container Service: ${err}`);
  process.exit(1);
});
