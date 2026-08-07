import { loadEnvFile } from 'node:process';
import { z } from 'zod';

loadEnvFile('.env');

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

if (!_env.success) {
  const issues = _env.error.issues
    .map((i) => `${i.path.join('.')}: ${i.message}`)
    .join('\n');
  throw new Error(`Invalid environment variables:\n${issues}`);
}

export const env = _env.data;
