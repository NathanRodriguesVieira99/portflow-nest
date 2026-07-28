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

import { ContainerArrivalRequestDto } from '@Dtos/container-arrival-request.dto';
import { ContainerArrivalResponseDto } from '@Dtos/container-arrival-response.dto';

import { Container } from '@Models/container.model';

import { RegisterContainerArrivalService } from '@Services/container/register-container-arrival.service';
import { RemoveContainerService } from '@Services/container/remove-container.service';
import { FindContainerByStatusService } from '@Services/container/find-container-by-status.service';
import { FindAllContainersService } from '@Services/container/find-all-containers.service';
import { FindContainerByIdService } from '@Services/container/find-container-by-id.service';
import { UpdateContainerStatusService } from '@Services/container/update-container-status.service';

import { resultToHttp } from '@Shared/utils/result-to-http.util';

import type { Pagination } from '@Contracts/pagination';
import type { RequestResponse } from '@Shared/responses';
import type { StatusContainer } from '@Types/status-container.type';

@Controller('containers')
export class ContainerController {
  constructor(
    private readonly registerContainerArrivalService: RegisterContainerArrivalService,
    private readonly findContainerByStatusService: FindContainerByStatusService,
    private readonly removeContainerService: RemoveContainerService,
    private readonly findAllContainersService: FindAllContainersService,
    private readonly findContainerByIdService: FindContainerByIdService,
    private readonly updateContainerStatusService: UpdateContainerStatusService,
  ) {}

  @Post('/arrivals')
  async registerContainerArrival(
    @Body() dto: ContainerArrivalRequestDto,
  ): Promise<RequestResponse<ContainerArrivalResponseDto>> {
    const result = await this.registerContainerArrivalService.execute(dto);
    return resultToHttp(result);
  }

  @Delete(':containerId')
  async removeContainer(
    @Param('containerId') containerId: string,
  ): Promise<RequestResponse<string>> {
    const result = await this.removeContainerService.execute(containerId);
    return resultToHttp(result);
  }

  @Get()
  async findAllContainers(
    @Query() queryParams: Pagination.Input,
  ): Promise<RequestResponse<Pagination.Output<Container>>> {
    const result = await this.findAllContainersService.execute(queryParams);
    return resultToHttp(result);
  }

  @Get('by-status')
  async findContainerByStatus(
    @Query() queryParams: Pagination.Input,
    @Query('status') status: StatusContainer,
  ): Promise<RequestResponse<Pagination.Output<Container>>> {
    const result = await this.findContainerByStatusService.execute(
      queryParams,
      status,
    );
    return resultToHttp(result);
  }

  @Get(':containerId')
  async findContainerById(
    @Param('containerId') containerId: string,
  ): Promise<RequestResponse<Container>> {
    const result = await this.findContainerByIdService.execute(containerId);
    return resultToHttp(result);
  }

  @Put(':containerId/update-status')
  async updateStatus(
    @Param('containerId') containerId: string,
    @Body('newStatus') newStatus: StatusContainer,
  ): Promise<RequestResponse<Container>> {
    const result = await this.updateContainerStatusService.execute({
      containerId,
      newStatus,
    });
    return resultToHttp(result);
  }
}
