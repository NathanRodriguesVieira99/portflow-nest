import { TERMINAL_REPOSITORY_CONTRACT } from '@/application/repositories/mongoose-terminal.repository.contract';
import { FindAllTerminalsUseCase } from '@/application/usecases/find-all-terminals';
import { FindTerminalByIdUseCase } from '@/application/usecases/find-terminal-by-id';
import { ValidateTerminalUseCase } from '@/application/usecases/validate-terminal';
import { HealthcheckController } from '@/infra/controllers/healthcheck.controller';
import { TerminalController } from '@/infra/controllers/terminal.controller';
import {
  TerminalSchema,
  TerminalSchemaDefinition,
} from '@/infra/persistence/database/mongodb/schemas/terminal.schema';
import { MongooseTerminalRepositoryImplementation } from '@/infra/persistence/repositories/mongodb/mongoose-terminal.repository.implementation';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TerminalSchema.name,
        schema: TerminalSchemaDefinition,
      },
    ]),
  ],
  providers: [
    ValidateTerminalUseCase,
    FindAllTerminalsUseCase,
    FindTerminalByIdUseCase,
    {
      provide: TERMINAL_REPOSITORY_CONTRACT,
      useClass: MongooseTerminalRepositoryImplementation,
    },
  ],
  exports: [ValidateTerminalUseCase],
  controllers: [HealthcheckController, TerminalController],
})
export class TerminalModule {}
