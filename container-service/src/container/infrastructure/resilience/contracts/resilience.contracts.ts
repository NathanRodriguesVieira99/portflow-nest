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

export const RESILIENCE = Symbol('RESILIENCE');
