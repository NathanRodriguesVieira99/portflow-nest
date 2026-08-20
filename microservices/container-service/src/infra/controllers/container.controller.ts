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
import { RegisterContainerArrivalUseCase } from '@/application/usecases/register-container-arrival';
import { FindContainerByStatusUseCase } from '@/application/usecases/find-container-by-status';
import { RemoveContainerUseCase } from '@/application/usecases/remove-container';
import { FindAllContainersUseCase } from '@/application/usecases/find-all-containers';
import { FindContainerByIdUseCase } from '@/application/usecases/find-container-by-id';
import { UpdateContainerStatusUseCase } from '@/application/usecases/update-container-status';
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
    private readonly registerContainerArrivalUseCase: RegisterContainerArrivalUseCase,
    private readonly findContainerByStatusUseCase: FindContainerByStatusUseCase,
    private readonly removeContainerUseCase: RemoveContainerUseCase,
    private readonly findAllContainersUseCase: FindAllContainersUseCase,
    private readonly findContainerByIdUseCase: FindContainerByIdUseCase,
    private readonly updateContainerStatusUseCase: UpdateContainerStatusUseCase,
  ) {}

  @Post('/arrivals')
  async registerContainerArrival(
    @Body() dto: ContainerArrival.Request,
  ): Promise<RequestResponse<ContainerArrival.Response>> {
    const result = await this.registerContainerArrivalUseCase.execute(dto);
    return resultToHttp(result);
  }

  @Delete(':containerId')
  async removeContainer(
    @Param('containerId') containerId: string,
  ): Promise<RequestResponse<string>> {
    const result = await this.removeContainerUseCase.execute(containerId);
    return resultToHttp(result);
  }

  @Get()
  async findAllContainers(
    @Query() queryParams: Pagination.Input,
  ): Promise<RequestResponse<Pagination.Output<Container>>> {
    const result = await this.findAllContainersUseCase.execute(queryParams);
    return resultToHttp(result);
  }

  @Get('by-status')
  async findContainerByStatus(
    @Query() queryParams: Pagination.Input,
    @Query('status') status: StatusContainer,
  ): Promise<RequestResponse<Pagination.Output<Container>>> {
    const result = await this.findContainerByStatusUseCase.execute(
      queryParams,
      status,
    );
    return resultToHttp(result);
  }

  @Get(':containerId')
  async findContainerById(
    @Param('containerId') containerId: string,
  ): Promise<RequestResponse<Container>> {
    const result = await this.findContainerByIdUseCase.execute(containerId);
    return resultToHttp(result);
  }

  @Put(':containerId/update-status')
  async updateStatus(
    @Param('containerId') containerId: string,
    @Body('newStatus') newStatus: StatusContainer,
  ): Promise<RequestResponse<Container>> {
    const result = await this.updateContainerStatusUseCase.execute({
      containerId,
      newStatus,
    });
    return resultToHttp(result);
  }
}
