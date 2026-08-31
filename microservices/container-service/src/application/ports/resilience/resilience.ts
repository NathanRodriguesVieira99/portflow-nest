export interface Resilience {
  execute<T>(
    fn: () => Promise<T>,
    fallbackFn?: () => T | Promise<T>,
  ): Promise<T>
}

/**
 * - halfOpenAfter: Tempo em ms para o circuit breaker passar de open para half-open.
 * - consecutiveFailures: Número de falhas consecutivas para abrir o circuit.
 */
export interface ResilienceConfig {
  halfOpenAfter?: number
  consecutiveFailures?: number
}

/**
 * - closed: Requests passam
 * - open: Requests falham rapidamente
 * - half-open: Testando se o serviço foi restabelecido
 */
export type CircuitBreakerState = 'closed' | 'open' | 'half-open'

export const RESILIENCE = Symbol('RESILIENCE')
