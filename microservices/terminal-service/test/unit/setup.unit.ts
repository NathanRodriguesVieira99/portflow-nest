import * as sinon from 'sinon';
import * as nock from 'nock';

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
  sinon.restore();
  nock.cleanAll();
});
