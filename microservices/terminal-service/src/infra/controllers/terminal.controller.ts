import { Controller, Get, Param, Query } from '@nestjs/common';
import { ValidateTerminalUseCase } from '@/application/usecases/validate-terminal';
import { Terminal } from '@/domain/entities/terminal';
import { resultToHttp } from '@/utils/result-to-http.util';
import { TerminalValidationResponse } from '@/domain/validators/TerminalValidationResponse';
import type { Pagination } from '@/@types/pagination';
import type { RequestResponse } from '@/@types/responses';
import type { FindAllTerminalsUseCase } from '@/application/usecases/find-all-terminals';
import type { FindTerminalByIdUseCase } from '@/application/usecases/find-terminal-by-id';

@Controller('terminals')
export class TerminalController {
  constructor(
    private readonly validateTerminalUseCase: ValidateTerminalUseCase,
    private readonly findAllTerminalsUseCase: FindAllTerminalsUseCase,
    private readonly findTerminalByIdUseCase: FindTerminalByIdUseCase,
  ) {}

  @Get('/:terminalId/validation')
  async validateTerminal(
    @Param('terminalId') terminalId: string,
    @Query('cargoType') cargoType: string,
  ): Promise<RequestResponse<TerminalValidationResponse>> {
    const result = await this.validateTerminalUseCase.execute(
      terminalId,
      cargoType,
    );
    return resultToHttp(result);
  }

  @Get()
  async findAll(
    @Query() queryParams: Pagination.Input,
  ): Promise<RequestResponse<Pagination.Output<Terminal>>> {
    const result = await this.findAllTerminalsUseCase.execute(queryParams);
    return resultToHttp(result);
  }

  @Get('/:terminalId')
  async findTerminalById(
    @Param('terminalId') terminalId: string,
  ): Promise<RequestResponse<Terminal>> {
    const result = await this.findTerminalByIdUseCase.execute(terminalId);
    return resultToHttp(result);
  }
}
