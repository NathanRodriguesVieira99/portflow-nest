import { CircuitBreaker } from './circuit-breaker';

describe('Circuit Breaker', () => {
  describe('Initial state', () => {
    it('should start in closed state', () => {
      const cb = new CircuitBreaker();
      expect(cb.getState()).toBe('closed');
    });

    it('should return isOpen as false initially ', () => {
      const cb = new CircuitBreaker();
      expect(cb.isOpen()).toBeFalsy();
    });
  });

  describe('execute()', () => {
    it('should execute successfully when closed ', async () => {
      const cb = new CircuitBreaker();
      const result = await cb.execute(async () => 'success');
      expect(result).toBe('success');
      expect(cb.getState()).toBe('closed');
    });

    it('should return async operation result', async () => {
      const cb = new CircuitBreaker();
      const result = await cb.execute(async () => {
        return { data: 67 };
      });
      expect(result).toEqual({ data: 67 });
    });

    it('should throw error on operation failure ', async () => {
      const cb = new CircuitBreaker();
      await expect(
        cb.execute(async () => {
          throw new Error('Operation failed');
        }),
      ).rejects.toThrow('Operation failed');
    });

    it('should track consecutive failures', async () => {
      const cb = new CircuitBreaker({ consecutiveFailures: 3 });

      for (let i = 0; i < 2; i++) {
        await expect(
          cb.execute(async () => {
            throw new Error('Failure');
          }),
        ).rejects.toThrow('Failure');
      }

      expect(cb.getState()).toBe('closed');
    });

    it('should open after consecutive failures', async () => {
      const cb = new CircuitBreaker({ consecutiveFailures: 3 });

      for (let i = 0; i < 3; i++) {
        await expect(
          cb.execute(async () => {
            throw new Error('Failure');
          }),
        ).rejects.toThrow('Failure');
      }

      expect(cb.getState()).toBe('open');
      expect(cb.isOpen()).toBeTruthy();
    });

    it('should return the correct boolean on isOpen()', async () => {
      const cb = new CircuitBreaker({ consecutiveFailures: 2 });
      expect(cb.isOpen()).toBeFalsy();

      for (let i = 0; i < 2; i++) {
        try {
          await cb.execute(async () => {
            throw new Error('Fail');
          });
        } catch {
          // expected
        }
      }

      expect(cb.isOpen()).toBeTruthy();
    });

    it('should fail when consecutive failures are 1 ', async () => {
      const cb = new CircuitBreaker({ consecutiveFailures: 1 });

      await expect(
        cb.execute(async () => {
          throw new Error('Fail');
        }),
      ).rejects.toThrow('Fail');

      expect(cb.isOpen()).toBeTruthy();
    });

    it('should accept custom halfOpenAfter ', async () => {
      const cb = new CircuitBreaker({
        halfOpenAfter: 2000,
        consecutiveFailures: 5,
      });

      await expect(
        cb.execute(async () => {
          throw new Error('Fail');
        }),
      ).rejects.toThrow('Fail');

      expect(cb.getState()).toBe('closed');
    });

    it('should change state to half-open and return to open or closed', async () => {
      const cb = new CircuitBreaker({
        halfOpenAfter: 100,
        consecutiveFailures: 2,
      });

      for (let i = 0; i < 2; i++) {
        try {
          await cb.execute(async () => {
            throw new Error('Fail');
          });
        } catch {
          // expected
        }
      }

      expect(cb.getState()).toBe('open');

      await new Promise((r) => setTimeout(r, 150));

      try {
        await cb.execute(async () => {
          throw new Error('Fail again');
        });
      } catch {
        //expected
      }

      expect(cb.getState()).toBe('open');
    });

    it('should return to  closed after half-open success', async () => {
      const cb = new CircuitBreaker({
        halfOpenAfter: 100,
        consecutiveFailures: 2,
      });

      for (let i = 0; i < 2; i++) {
        try {
          await cb.execute(async () => {
            throw new Error('Fail');
          });
        } catch {
          // expected
        }
      }

      expect(cb.getState()).toBe('open');

      await new Promise((r) => setTimeout(r, 150));

      const result = await cb.execute(async () => 'success');

      expect(result).toBe('success');
      expect(cb.getState()).toBe('closed');
    });
  });
});
