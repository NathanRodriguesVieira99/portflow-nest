import { env } from '../env';

export const SERVICE_NAME = env.SERVICE_NAME ?? 'Terminal-Service';

export const OTEL_EXPORTER_OTLP_ENDPOINT =
  env.OTEL_EXPORTER_OTLP_ENDPOINT ?? 'http://localhost:4318/v1/traces';
