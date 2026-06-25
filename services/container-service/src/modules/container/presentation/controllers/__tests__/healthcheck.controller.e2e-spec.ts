import { Test, TestingModule } from '@nestjs/testing';

import { Healthcheck } from '../healthcheck.controller';

describe('Healthcheck', () => {
  let controller: Healthcheck;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Healthcheck],
    }).compile();

    controller = module.get<Healthcheck>(Healthcheck);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
