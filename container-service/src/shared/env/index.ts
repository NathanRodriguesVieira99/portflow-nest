import { config } from 'dotenv';
import { loadEnvFile } from 'node:process';
import { Logger } from '@nestjs/common';
import { z } from 'zod';

/**
 * Carrega dinamicamente os arquivos .env ao rodar o projeto
 * - .env.local => roda o projeto fora do docker (necessita subir infra via docker)
 * - .env => roda o projeto dentro do docker + infra
 */
const loadEnvFiles = () => {
  try {
    loadEnvFile('.env.local');
  } catch {
    loadEnvFile('.env');
  }
};

loadEnvFiles();
config();

export const envSchema = z.object({
  SERVICE_NAME: z.string().default('container-service'),
  TERMINAL_SERVICE_BASE_URL: z.string().default('http://localhost:3434'),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().default(6379),
  DATABASE_URL: z.string(),
  LOKI_URL: z.string().default('http://localhost:3100'),
  OTEL_EXPORTER_OTLP_ENDPOINT: z
    .string()
    .default('http://localhost:4318/v1/traces'),
  KAFKA_BROKER: z.string().default('localhost:29092'),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  if (process.env.NODE_ENV === 'development') {
    Logger.error(
      'Error on validate environment variables!',
      z.treeifyError(_env.error),
    );
  }
  throw new Error('Invalid environment variables!');
}

export const env = _env.data;
