import { Inject, Injectable } from '@nestjs/common';
import {
  TERMINAL_REPOSITORY_CONTRACT,
  type MongooseTerminalRepositoryContract,
} from '../repositories/mongoose-terminal.repository.contract';
import { ok, type Result } from '@/@types/result';
import { Terminal } from '@/domain/entities/terminal';

@Injectable()
export class FindTerminalByIdUseCase {
  constructor(
    @Inject(TERMINAL_REPOSITORY_CONTRACT)
    private readonly repo: MongooseTerminalRepositoryContract,
  ) {}

  async execute(terminalId: string): Promise<Result<Terminal>> {
    const terminal = await this.repo.findTerminalById(terminalId);
    if (!terminal.ok) return terminal;
    return ok(terminal.value);
  }
}
