import { Terminal } from '@/domain/entities/terminal';

import type { Result } from '@/@types/result';
import type { Pagination } from '@/@types/pagination';

export interface MongooseTerminalRepositoryContract {
  save: (terminal: Terminal) => Promise<Result<Terminal>>;
  findAll: (
    queryParams: Pagination.Input,
  ) => Promise<Result<Pagination.Output<Terminal>>>;
  findTerminalById: (terminalId: string) => Promise<Result<Terminal>>;
}

export const TERMINAL_REPOSITORY_CONTRACT = Symbol(
  'TerminalRepositoryContract',
);
