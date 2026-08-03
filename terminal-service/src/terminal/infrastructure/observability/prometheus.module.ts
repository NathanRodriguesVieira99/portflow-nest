import { Module } from '@nestjs/common';
import { PrometheusModule as Prometheus } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    Prometheus.register({
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
})
export class PrometheusModule {}
