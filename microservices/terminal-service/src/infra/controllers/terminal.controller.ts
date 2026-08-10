import { Controller, Get, Param, Query } from '@nestjs/common';
import { TerminalService } from '@/application/usecases/terminal';
import { Terminal } from '@/domain/entities/terminal';
import { resultToHttp } from '@/utils/result-to-http.util';
import { TerminalValidationResponse } from '@/domain/validators/TerminalValidationResponse';
import type { Pagination } from '@/@types/pagination';
import type { RequestResponse } from '@/@types/responses';

@Controller('terminals')
export class TerminalController {
  constructor(private readonly service: TerminalService) {}

  @Get()
  async findAll(
    @Query() queryParams: Pagination.Input,
  ): Promise<RequestResponse<Pagination.Output<Terminal>>> {
    const result = await this.service.findAll(queryParams);
    return resultToHttp(result);
  }

  @Get('/:terminalId')
  async findTerminalById(
    @Param('terminalId') terminalId: string,
  ): Promise<RequestResponse<Terminal>> {
    const result = await this.service.findById(terminalId);
    return resultToHttp(result);
  }

  @Get('/:terminalId/validation')
  async validateTerminal(
    @Param('terminalId') terminalId: string,
    @Query('cargoType') cargoType: string,
  ): Promise<RequestResponse<TerminalValidationResponse>> {
    const result = await this.service.validateTerminal(terminalId, cargoType);
    return resultToHttp(result);
  }
}
