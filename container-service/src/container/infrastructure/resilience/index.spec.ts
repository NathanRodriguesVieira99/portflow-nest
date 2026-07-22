import { Resilience } from '.';

describe('Circuit Breaker', () => {
  const failTimes = async (cb: Resilience, n: number) => {
    for (let i = 0; i < n; i++) {
      await cb
        .execute(async () => {
          throw new Error('Fail');
        })
        .catch(() => {});
    }
  };

  describe('execute()', () => {
    it('should execute successfully when closed', async () => {
      const cb = new Resilience();
      expect(await cb.execute(async () => 'request passing successfully')).toBe(
        'request passing successfully',
      );
    });

    it('should block requests when open', async () => {
      const cb = new Resilience({ consecutiveFailures: 2 });
      await failTimes(cb, 2);
      await expect(
        cb.execute(async () => 'request passing with error'),
      ).rejects.toThrow();
    });

    it('should return closed after half-open success', async () => {
      const cb = new Resilience({
        halfOpenAfter: 100,
        consecutiveFailures: 2,
      });
      await failTimes(cb, 2);
      await new Promise((r) => setTimeout(r, 1050));
      expect(await cb.execute(async () => 'recovered')).toBe('recovered');
    });
  });

  describe('executeWithFallback()', () => {
    it('should use fallback when circuit is open', async () => {
      const cb = new Resilience({ consecutiveFailures: 1 });
      await failTimes(cb, 1);
      const result = await cb.executeWithFallback(
        async () => {
          throw new Error('Fail');
        },
        async () => 'fallback',
      );
      expect(result).toBe('fallback');
    });
  });

  describe('getState()', () => {
    it('should return open state', async () => {
      const cb = new Resilience({ consecutiveFailures: 2 });
      await failTimes(cb, 2);
      await expect(
        cb.execute(async () => 'request passing with error'),
      ).rejects.toThrow();
      expect(cb.getState()).toBe('open');
    });

    it('should return closed state', async () => {
      const cb = new Resilience({
        halfOpenAfter: 100,
        consecutiveFailures: 2,
      });
      expect(cb.getState()).toBe('closed');
    });

    it('should return half-open state', async () => {
      const cb = new Resilience({ halfOpenAfter: 100, consecutiveFailures: 2 });
      await failTimes(cb, 2);
      await new Promise((r) => setTimeout(r, 120));
      let state: string | undefined;
      await cb.execute(async () => (state = cb.getState()));
      expect(state).toBe('half-open');
    });
  });

  describe('mapCircuitState()', () => {
    it('should throw on unknown circuit state', () => {
      const fakeState: any = 'unmapped state';
      const cb = new Resilience();
      expect(() => cb.mapCircuitState(fakeState)).toThrow(
        `Unhandled circuit state: ${fakeState}`,
      );
    });
  });

  describe('isOpen()', () => {
    it('should return open state', async () => {
      const cb = new Resilience({ consecutiveFailures: 2 });
      await failTimes(cb, 2);
      await expect(
        cb.execute(async () => 'request passing with error'),
      ).rejects.toThrow();
      expect(cb.isOpen()).toBeTruthy();
    });
  });
});
