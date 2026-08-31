import { Logger } from '@nestjs/common';
import {
  circuitBreaker,
  type CircuitBreakerPolicy,
  CircuitState,
  ConsecutiveBreaker,
  fallback,
  handleAll,
  wrap,
} from 'cockatiel';
import type {
  CircuitBreakerState,
  Resilience,
  ResilienceConfig,
} from '@/application/ports/resilience/resilience';

/**
 * Adapter que implementa {@link Resilience} utilizando a lib Cockatiel.
 */
export class CockatielAdapter implements Resilience {
  private readonly logger = new Logger(CockatielAdapter.name);
  private readonly breakerPolicy: CircuitBreakerPolicy;

  constructor(config: ResilienceConfig = {}) {
    const { halfOpenAfter = 2000, consecutiveFailures = 5 } = config;

    this.breakerPolicy = circuitBreaker(handleAll, {
      halfOpenAfter,
      breaker: new ConsecutiveBreaker(consecutiveFailures),
    });

    this.breakerPolicy.onStateChange((state) =>
      this.logger.log(`Circuit state: ${this.mapCircuitState(state)} `),
    );
    this.breakerPolicy.onBreak(() => {
      this.logger.warn(`Circuit Breaker is OPEN`);
    });
    this.breakerPolicy.onReset(() =>
      this.logger.log('Circuit Breaker is Closed (service recovered)'),
    );
  }

  static create(config?: ResilienceConfig) {
    return new CockatielAdapter(config);
  }

  getState(): CircuitBreakerState {
    return this.mapCircuitState(this.breakerPolicy.state);
  }

  private mapCircuitState(state: CircuitState): CircuitBreakerState {
    switch (state) {
      case CircuitState.Closed:
        return 'closed';
      case CircuitState.Open:
        return 'open';
      case CircuitState.HalfOpen:
        return 'half-open';
      default:
        throw new Error(`Unhandled circuit state: ${state}`);
    }
  }

  async execute<T>(
    fn: () => Promise<T>,
    fallbackFn?: () => T | Promise<T>,
  ): Promise<T> {
    if (!fallbackFn) return this.breakerPolicy.execute(fn);
    const fallbackPolicy = fallback<T>(handleAll, fallbackFn);
    const policy = wrap(fallbackPolicy, this.breakerPolicy);
    return policy.execute(fn);
  }
}
