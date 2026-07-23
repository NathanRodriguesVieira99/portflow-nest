import {
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  Controller,
} from '@nestjs/common';
import { Container } from '@Models/container.model';
import { ContainerService } from '@/container/application/services/container/container.service';
import { resultToHttp } from '@Shared/utils/result-to-http.util';

import type { RequestResponse } from '@Shared/responses';
import type { PaginationOutput } from '@/container/application/contracts/pagination.output';
import type { PaginationInput } from '@/container/application/contracts/pagination.input';
import type { StatusContainer } from '@Types/status-container.type';
import type { ContainerArrivalRequestDto } from '@Dtos/container-arrival-request.dto';
import type { ContainerArrivalResponseDto } from '@Dtos/container-arrival-response.dto';

@Controller('containers')
export class ContainerController {
  constructor(private readonly containerService: ContainerService) {}

  @Post('/arrivals')
  async registerContainerArrival(
    @Body() dto: ContainerArrivalRequestDto,
  ): Promise<RequestResponse<ContainerArrivalResponseDto>> {
    const result = await this.containerService.registerContainerArrival(dto);
    return resultToHttp(result);
  }

  @Delete(':containerId')
  async removeContainer(
    @Param('containerId') containerId: string,
  ): Promise<RequestResponse<string>> {
    const result = await this.containerService.remove(containerId);
    return resultToHttp(result);
  }

  @Get()
  async findAllContainers(
    @Query() queryParams: PaginationInput,
  ): Promise<RequestResponse<PaginationOutput<Container>>> {
    const result = await this.containerService.findAll(queryParams);
    return resultToHttp(result);
  }

  @Get('status')
  async findContainerByStatus(
    @Query() queryParams: PaginationInput,
    @Query('status') status: StatusContainer,
  ): Promise<RequestResponse<PaginationOutput<Container>>> {
    const result = await this.containerService.findByStatus(
      queryParams,
      status,
    );
    return resultToHttp(result);
  }

  @Get(':containerId')
  async findContainerById(
    @Param('containerId') containerId: string,
  ): Promise<RequestResponse<Container>> {
    const result = await this.containerService.findById(containerId);
    return resultToHttp(result);
  }

  @Put(':containerId/update-status')
  async updateStatus(
    @Param('containerId') containerId: string,
    @Body('newStatus') newStatus: StatusContainer,
  ): Promise<RequestResponse<Container>> {
    const result = await this.containerService.updateStatus({
      containerId,
      newStatus,
    });
    return resultToHttp(result);
  }
}
