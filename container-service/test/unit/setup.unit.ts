import * as sinon from 'sinon';
import * as nock from 'nock';

afterEach(() => {
  vi.resetAllMocks();
  vi.clearAllMocks();
  sinon.restore();
  nock.cleanAll();
});
