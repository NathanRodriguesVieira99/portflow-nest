import {
  circuitBreaker,
  ConsecutiveBreaker,
  fallback,
  handleAll,
  wrap,
  type CircuitBreakerPolicy,
  CircuitState,
} from 'cockatiel';

export interface ResilienceContract {
  execute<T>(
    fn: () => Promise<T>,
    fallbackFn?: () => T | Promise<T>,
  ): Promise<T>;
}

export interface ResilienceConfig {
  halfOpenAfter?: number; // Tempo em ms para o circuit breaker passar de open para half-open.
  consecutiveFailures?: number; // Número de falhas consecutivas para abrir o circuit.
}

/**
 * - closed: Requests passam
 * - open: Requests falham rapidamente
 * - half-open: Testando se o serviço foi restabelecido
 */
export type CircuitBreakerState = 'closed' | 'open' | 'half-open';

/**
 * Adapter que implementa {@link ResilienceContract} utilizando a lib Cockatiel.
 */
export class CockatielAdapter implements ResilienceContract {
  private readonly breakerPolicy: CircuitBreakerPolicy;

  constructor(config: ResilienceConfig = {}) {
    const { halfOpenAfter = 2000, consecutiveFailures = 5 } = config;

    this.breakerPolicy = circuitBreaker(handleAll, {
      halfOpenAfter,
      breaker: new ConsecutiveBreaker(consecutiveFailures),
    });
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

export const RESILIENCE = Symbol('RESILIENCE');
