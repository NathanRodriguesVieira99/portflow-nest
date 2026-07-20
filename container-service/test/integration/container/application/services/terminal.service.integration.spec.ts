import { Test, TestingModule } from '@nestjs/testing';
import { ClsModule } from 'nestjs-cls';
import { HttpClient } from '../../../../../src/infrastructure/http/http-client';
import { TerminalHttp } from '@Infra/http/terminal.http';
import { TerminalService } from '@Services/terminal.service';

describe('TerminalService', () => {
  let service: TerminalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClsModule],
      providers: [TerminalService, TerminalHttp, HttpClient],
    }).compile();

    service = module.get<TerminalService>(TerminalService);
  });

  it.todo('should be defined', () => {
    expect(service).toBeDefined();
  });
});
