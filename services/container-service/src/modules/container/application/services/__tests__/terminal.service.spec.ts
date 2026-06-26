import { Test, TestingModule } from '@nestjs/testing';

import { TerminalHttp } from '../../../infra/http/terminal.http';
import { TerminalService } from '../terminal.service';

describe('TerminalService', () => {
  let service: TerminalService;

  const mockValidateTerminal = { validateTerminal: vi.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TerminalService,
        {
          provide: TerminalHttp,
          useValue: mockValidateTerminal,
        },
      ],
    }).compile();

    service = module.get<TerminalService>(TerminalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
