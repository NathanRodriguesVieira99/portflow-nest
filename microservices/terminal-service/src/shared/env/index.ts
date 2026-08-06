import 'dotenv/config';
import * as z from 'zod';

export const envSchema = z.object({
  SERVICE_NAME: z.string().default('terminal-service'),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3434),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().default(6379),
  LOKI_URL: z.string().default('http://localhost:3100'),
  OTEL_EXPORTER_OTLP_ENDPOINT: z
    .string()
    .default('http://localhost:4318/v1/traces'),
  KAFKA_BROKER: z.string().default('localhost:29092'),MONGODB_URI: z.string().def
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  const issues = _env.error.issues
    .map((i) => `${i.path.join('.')}: ${i.message}`)
    .join('\n');
  throw new Error(`Invalid environment variables:\n${issues}`);
}

export const env = _env.data;
