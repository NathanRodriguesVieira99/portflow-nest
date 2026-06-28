import { env } from '../config/env';

export const TERMINAL_SERVICE_BASE_URL =
  env.TERMINAL_SERVICE_BASE_URL ?? 'http://localhost:3434';

export const SERVICE_NAME = env.SERVICE_NAME ?? 'Container-Service';

export const OTEL_EXPORTER_OTLP_ENDPOINT =
  env.OTEL_EXPORTER_OTLP_ENDPOINT ?? 'http://localhost:4318/v1/traces';
