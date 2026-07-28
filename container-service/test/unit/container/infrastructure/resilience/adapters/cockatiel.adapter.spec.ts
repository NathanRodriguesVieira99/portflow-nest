import { CockatielAdapter } from '@Infra/resilience/';

describe('Circuit Breaker', () => {
  const failTimes = async (cb: CockatielAdapter, n: number) => {
    for (let i = 0; i < n; i++) {
      await cb
        .execute(async () => {
          throw new Error('Fail');
        })
        .catch(() => {});
    }
  };

  describe('circuitBreaker()', () => {
    it('should execute successfully when closed', async () => {
      const cb = new CockatielAdapter();
      await expect(cb.execute(async () => 'ok')).resolves.toBe('ok');
      expect(cb.getState()).toBe('closed');
    });

    it('should block requests when open', async () => {
      const cb = new CockatielAdapter({ consecutiveFailures: 2 });
      const fn = vi.fn(async () => 'request passing with error');
      await failTimes(cb, 2);
      await expect(cb.execute(fn)).rejects.toThrow();
    });

    it('should return closed after half-open success', async () => {
      vi.useFakeTimers();
      try {
        const cb = new CockatielAdapter({
          halfOpenAfter: 100,
          consecutiveFailures: 2,
        });
        await failTimes(cb, 2);
        await vi.advanceTimersByTimeAsync(100);
        await expect(cb.execute(async () => 'recovered')).resolves.toBe(
          'recovered',
        );
        expect(cb.getState()).toBe('closed');
      } finally {
        vi.useRealTimers();
      }
    });
  });

  describe('circuitBreakerWithFallback()', () => {
    it('should use fallback when circuit is open', async () => {
      const cb = new CockatielAdapter({ consecutiveFailures: 1 });
      const fn = vi.fn(async () => 'original fn');
      await failTimes(cb, 1);
      await expect(cb.execute(fn, async () => 'fallback fn')).resolves.toBe(
        'fallback fn',
      );
      expect(fn).not.toHaveBeenCalled();
    });
  });

  describe('getState()', () => {
    it('should return open state', async () => {
      const cb = new CockatielAdapter({ consecutiveFailures: 2 });
      await failTimes(cb, 2);
      await expect(
        cb.execute(async () => 'request passing with error'),
      ).rejects.toThrow();
      expect(cb.getState()).toBe('open');
    });

    it('should return closed state', async () => {
      const cb = new CockatielAdapter({
        halfOpenAfter: 100,
        consecutiveFailures: 2,
      });
      expect(cb.getState()).toBe('closed');
    });

    it('should return half-open state', async () => {
      const cb = new CockatielAdapter({
        halfOpenAfter: 100,
        consecutiveFailures: 2,
      });
      await failTimes(cb, 2);
      await new Promise((r) => setTimeout(r, 120));
      let state: string | undefined;
      await cb.execute(async () => (state = cb.getState()));
      expect(state).toBe('half-open');
    });
  });
});
