import { Test, TestingModule } from '@nestjs/testing';
import { ClsModule } from 'nestjs-cls';
import { TerminalHttp } from '@Infra/http/terminal/terminal.http';
import { TerminalService } from '@Services/terminal/terminal.service';
import { HttpClient } from '@/container/infrastructure/http/clients/http-client';

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
