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
import { Container } from '@/domain/entities/container.entity';
import { RegisterContainerArrivalService } from '@/application/usecases/register-container-arrival';
import { FindContainerByStatusService } from '@/application/usecases/find-container-by-status';
import { RemoveContainerService } from '@/application/usecases/remove-container';
import { FindAllContainersService } from '@/application/usecases/find-all-containers';
import { FindContainerByIdService } from '@/application/usecases/find-container-by-id';
import { UpdateContainerStatusService } from '@/application/usecases/update-container-status';
import { resultToHttp } from '@/utils/result-to-http';
import type { Pagination } from '@/@types/pagination';
import type { StatusContainer } from '@/@types/status-container.type';
import type { RequestResponse } from '@/utils/http-responses';

export namespace ContainerArrival {
  export interface Response {
    containerId: string;
    shipId: string;
    terminalId: string;
    originCountry: string;
    destinationCountry: string;
    cargoType: string;
    statusContainer: StatusContainer;
    arrivalDate: Date;
  }

  export interface Request {
    containerId: string;
    shipId: string;
    terminalId: string;
    originCountry: string;
    destinationCountry: string;
    cargoType: string;
  }
}

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
    @Body() dto: ContainerArrival.Request,
  ): Promise<RequestResponse<ContainerArrival.Response>> {
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
