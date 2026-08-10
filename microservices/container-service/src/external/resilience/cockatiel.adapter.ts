import { Logger } from '@nestjs/common';
import {
  circuitBreaker,
  ConsecutiveBreaker,
  fallback,
  handleAll,
  wrap,
  type CircuitBreakerPolicy,
  CircuitState,
} from 'cockatiel';
import type {
  CircuitBreakerState,
  ResilienceConfig,
  ResilienceContract,
} from '../../application/ports/resilience';

/**
 * Adapter que implementa {@link ResilienceContract} utilizando a lib Cockatiel.
 */
export class CockatielAdapter implements ResilienceContract {
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
