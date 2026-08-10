import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TerminalSchema, TerminalSchemaDefinition } from "../persistence/database/mongodb/schemas/terminal.schema";
import { TerminalService } from "@/application/usecases/terminal";
import { TERMINAL_REPOSITORY_CONTRACT } from "../persistence/repositories/mongodb/mongoose-terminal.repository.contract";
import { MongooseTerminalRepositoryImplementation } from "../persistence/repositories/mongodb/mongoose-terminal.repository.implementation";
import { HealthcheckController } from "../controllers/healthcheck.controller";
import { TerminalController } from "../controllers/terminal.controller";

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
    TerminalService,
    {
      provide: TERMINAL_REPOSITORY_CONTRACT,
      useClass: MongooseTerminalRepositoryImplementation,
    },
  ],
  exports: [TerminalService],
  controllers: [HealthcheckController, TerminalController],
})
export class TerminalModule {}
