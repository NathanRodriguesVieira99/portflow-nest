import sinon from 'sinon';

afterEach(() => {
  sinon.restore();
  vi.resetAllMocks();
  vi.clearAllMocks();
});
