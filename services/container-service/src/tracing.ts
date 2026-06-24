import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { KafkaJsInstrumentation } from '@opentelemetry/instrumentation-kafkajs';
import { PrismaInstrumentation } from '@prisma/instrumentation';

const serviceName = process.env.SERVICE_NAME ?? 'Container-Service';

const otlpEndpoint =
  process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? 'http://localhost:4318/v1/traces';

const traceExporter = new OTLPTraceExporter({ url: otlpEndpoint });

export const sdk = new NodeSDK({
  resource: resourceFromAttributes({ [ATTR_SERVICE_NAME]: serviceName }),
  spanProcessors: [new BatchSpanProcessor(traceExporter)],
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new NestInstrumentation(),
    new KafkaJsInstrumentation(),
    new PrismaInstrumentation(),
  ],
});

sdk.start();

process.on('SIGTERM', () => sdk.shutdown());
