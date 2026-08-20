import { Injectable, Inject } from '@nestjs/common';
import {
  TERMINAL_REPOSITORY_CONTRACT,
  type MongooseTerminalRepositoryContract,
} from '../repositories/mongoose-terminal.repository.contract';
import type { Pagination } from '@/@types/pagination';
import { ok, type Result } from '@/@types/result';
import { Terminal } from '@/domain/entities/terminal';

@Injectable()
export class FindAllTerminalsUseCase {
  constructor(
    @Inject(TERMINAL_REPOSITORY_CONTRACT)
    private readonly repo: MongooseTerminalRepositoryContract,
  ) {}

  async execute(
    queryParams: Pagination.Input,
  ): Promise<Result<Pagination.Output<Terminal>>> {
    const terminals = await this.repo.findAll(queryParams);
    if (!terminals.ok) return terminals;
    return ok(terminals.value);
  }
}
