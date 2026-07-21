import {
  circuitBreaker,
  fallback,
  ConsecutiveBreaker,
  handleAll,
  CircuitState,
  type CircuitBreakerPolicy,
  wrap,
} from 'cockatiel';

export interface CircuitBreakerConfig {
  /**
   * Tempo em ms para o circuit breaker passar de open para half-open.
   */
  halfOpenAfter?: number;
  /**
   * Número de falhas consecutivas para abrir o circuit.
   */
  consecutiveFailures?: number;
}

/**
 * - closed: Requests passam
 * - open: Requests falham rapidamente
 * - half-open: Testando se o serviço foi restabelecido
 */
export type CircuitBreakerState = 'closed' | 'open' | 'half-open';

/**
 * CircuitBreaker faz um wrap no circuit breaker do Cockatiel
 */
export class CircuitBreaker {
  private readonly circuitBreakerPolicy: CircuitBreakerPolicy;
  private currentState: CircuitBreakerState = 'closed';

  constructor(config?: CircuitBreakerConfig) {
    const halfOpenAfter = config?.halfOpenAfter ?? 20000;
    const consecutiveFailures = config?.consecutiveFailures ?? 5;

    this.circuitBreakerPolicy = circuitBreaker(handleAll, {
      halfOpenAfter,
      breaker: new ConsecutiveBreaker(consecutiveFailures),
    });

    // Rastreia o estado do circuit breaker
    this.circuitBreakerPolicy.onStateChange((state: CircuitState) => {
      this.currentState = this.mapCircuitState(state);
    });
  }

  /**
   * Executa uma operação protegida pelo Circuit Breaker.
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    return this.circuitBreakerPolicy.execute(fn);
  }

  /**
   * Executa uma operação protegida pelo Circuit Breaker.
   * Caso ocorra qualquer falha executa o fallback.
   */
  async executeWithFallback<T>(
    fn: () => Promise<T>,
    fallbackFn: () => Promise<T>,
  ): Promise<T> {
    const fallbackPolicy = fallback(handleAll, () => {
      return fallbackFn();
    });

    const policy = wrap(this.circuitBreakerPolicy, fallbackPolicy);

    return policy.execute(fn);
  }

  /**
   * Retorna o estado atual do circuit breaker.
   */
  getState(): CircuitBreakerState {
    return this.currentState;
  }

  /**
   * Verifica se o circuit breaker está aberto (bloqueia requests).
   */
  isOpen(): boolean {
    return this.currentState === 'open';
  }

  /**
   * Mapeia o enum CircuitState do Cockatiel para o tipo literal
   */
  private mapCircuitState(state: CircuitState): CircuitBreakerState {
    switch (state) {
      case CircuitState.Closed:
        return 'closed';
      case CircuitState.Open:
        return 'open';
      case CircuitState.HalfOpen:
        return 'half-open';
      default:
        return 'closed';
    }
  }
}
