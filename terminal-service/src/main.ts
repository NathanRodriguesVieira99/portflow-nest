import './tracing';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './shared/env';
import { Logger as PinoLogger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.setGlobalPrefix('api/v1');

  app.useLogger(app.get(PinoLogger));

  await app.listen(env.PORT, '0.0.0.0');
}
bootstrap().catch((err) => {
  console.error(`Error when start Container Service: ${err}`);
  process.exit(1);
});
