import {
  circuitBreaker,
  ConsecutiveBreaker,
  handleAll,
  CircuitState,
  type CircuitBreakerPolicy,
} from 'cockatiel';

export interface CircuitBreakerConfig {
  halfOpenAfter?: number;
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
  private readonly circuitBreaker: CircuitBreakerPolicy;
  private currentState: CircuitBreakerState = 'closed';

  constructor(config?: CircuitBreakerConfig) {
    const halfOpenAfter = config?.halfOpenAfter ?? 20000;
    const consecutiveFailures = config?.consecutiveFailures ?? 5;

    this.circuitBreaker = circuitBreaker(handleAll, {
      halfOpenAfter,
      breaker: new ConsecutiveBreaker(consecutiveFailures),
    });

    // Rastreia o estado do circuit breaker
    this.circuitBreaker.onStateChange((state: CircuitState) => {
      this.currentState = this.mapCircuitState(state);
    });
  }

  /**
   * Se o circuit estiver open, a operação irá falhar sem executar.
   * Se o circuit estiver closed ou half-open, a operação será executada e seu sucesso/falha será rastreado.
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    return this.circuitBreaker.execute(fn);
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
