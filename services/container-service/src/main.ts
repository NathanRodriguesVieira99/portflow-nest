import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Logger as PinoLogger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { env } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.setGlobalPrefix('/api/v1');

  /* CORS */
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') ?? 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  /* Logs */
  const logger = new Logger('Container Service');
  app.useLogger(app.get(PinoLogger));

  /* APP */
  await app.listen(env.PORT);
  logger.log(`Project is running on: http://localhost:${env.PORT}/api/v1`);
}
bootstrap().catch((err) => {
  Logger.error(`Error when start Container Service: ${err}`);
  process.exit(1);
});
