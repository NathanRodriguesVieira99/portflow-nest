import mongoose, { type Model } from 'mongoose';
import {
  TerminalSchema,
  TerminalSchemaDefinition,
} from '@/infra/persistence/database/mongodb/schemas/terminal.schema';
import type { MongooseTerminalRepositoryContract } from '@/application/repositories/mongoose-terminal.repository.contract';
import { ValidateTerminalUseCase } from '@/application/usecases/validate-terminal';
import { MongooseTerminalRepositoryImplementation } from '@/infra/persistence/repositories/mongodb/mongoose-terminal.repository.implementation';

describe('ValidateTerminalUseCase', () => {
  let mongo: Model<TerminalSchema>;
  let repo: MongooseTerminalRepositoryContract;
  let sut: ValidateTerminalUseCase;

  beforeAll(() => {
    mongo = mongoose.model<TerminalSchema>(
      TerminalSchema.name,
      TerminalSchemaDefinition,
    );
  });

  beforeEach(() => {
    repo = new MongooseTerminalRepositoryImplementation(mongo);
    sut = new ValidateTerminalUseCase(repo);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
