import { Logger } from '@nestjs/common';
import {
  circuitBreaker,
  CircuitState,
  ConsecutiveBreaker,
  fallback,
  handleAll,
  wrap,
  type CircuitBreakerPolicy,
} from 'cockatiel';

export interface CircuitBreakerConfig {
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
 * Faz um wrap nas policies de resiliência da lib Cockatiel evitando alto acoplamento a libs externas
 */
export class Resilience {
  private readonly logger = new Logger();
  private readonly circuitBreakerPolicy: CircuitBreakerPolicy;

  constructor(config?: CircuitBreakerConfig) {
    const halfOpenAfter = config?.halfOpenAfter ?? 2000;
    const consecutiveFailures = config?.consecutiveFailures ?? 5;

    this.circuitBreakerPolicy = circuitBreaker(handleAll, {
      halfOpenAfter,
      breaker: new ConsecutiveBreaker(consecutiveFailures),
    });
  }

  static create() {
    return new Resilience();
  }

  /**
   * Executa uma operação protegida pelo Circuit Breaker.
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    return this.circuitBreakerPolicy.execute(fn);
  }

  /**
   * Executa uma operação protegida pelo Circuit Breaker com Fallback.
   */
  async executeWithFallback<T>(
    fn: () => Promise<T>,
    fallbackFn: () => Promise<T>,
  ): Promise<T> {
    const fallbackPolicy = fallback(handleAll, () => fallbackFn());
    return wrap(fallbackPolicy, this.circuitBreakerPolicy).execute(fn);
  }

  /**
   * Verifica se o circuit breaker está aberto (bloqueia requests).
   */
  isOpen(): boolean {
    return this.circuitBreakerPolicy.state === CircuitState.Open;
  }

  /**
   * Retorna o estado atual do circuit breaker
   * */
  getState(): CircuitBreakerState {
    return this.mapCircuitState(this.circuitBreakerPolicy.state);
  }

  /**
   * Mapeia o enum CircuitState do Cockatiel para o tipo literal CircuitBreakerState
   */
  private mapCircuitState(state: CircuitState): CircuitBreakerState {
    switch (state) {
      case CircuitState.Closed:
        this.logger.warn(`Circuit: half closed`);
        return 'closed';
      case CircuitState.Open:
        this.logger.warn(`Circuit: open`);
        return 'open';
      case CircuitState.HalfOpen:
        this.logger.warn(`Circuit: half open`);
        return 'half-open';
      default:
        this.logger.error(`Unhandled circuit state: ${state}`);
        throw new Error(`Unhandled circuit state: ${state}`);
    }
  }
}
