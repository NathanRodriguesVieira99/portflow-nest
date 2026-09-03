import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  RegisterContainerArrivalUseCase,
  type ContainerArrival,
} from '@/application/usecases/container/register-container-arrival';
import { RemoveContainerUseCase } from '@/application/usecases/container/remove-container';
import {
  FindAllContainersUseCase,
  type FindAllContainers,
} from '@/application/usecases/container/find-all-containers';
import { FindContainerByIdUseCase } from '@/application/usecases/container/find-container-by-id';
import { FindContainerByStatusUseCase } from '@/application/usecases/container/find-container-by-status';
import { UpdateContainerStatusUseCase } from '@/application/usecases/container/update-container-status';
import { Container } from '@/domain/entities/container.entity';
import { resultToHttp } from '@/infra/http/result-to-http';
import type { StatusContainer } from '@/domain/types/status-container.type';
import type { RequestResponse } from '@/infra/http/http-responses';
import type { Pagination } from '@/domain/types/pagination';

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
    @Body()
    {
      containerId,
      shipId,
      terminalId,
      originCountry,
      destinationCountry,
      cargoType,
    }: ContainerArrival.Input,
  ): Promise<RequestResponse<ContainerArrival.Output>> {
    const result = await this.registerContainerArrivalUseCase.execute({
      containerId,
      shipId,
      terminalId,
      originCountry,
      destinationCountry,
      cargoType,
    });
    return resultToHttp(result);
  }

  @Delete(':containerId')
  async removeContainer(
    @Param('containerId') containerId: string,
  ): Promise<RequestResponse<string>> {
    const result = await this.removeContainerUseCase.execute({ containerId });
    return resultToHttp(result);
  }

  @Get()
  async findAllContainers(
    @Query() queryParams: FindAllContainers.Input,
  ): Promise<RequestResponse<Pagination.Output<Container>>> {
    const result = await this.findAllContainersUseCase.execute(queryParams);
    return resultToHttp(result);
  }

  @Get('by-status')
  async findContainerByStatus(
    @Query() queryParams: Pagination.Input,
    @Query('status') status: StatusContainer,
  ): Promise<RequestResponse<Pagination.Output<Container>>> {
    const result = await this.findContainerByStatusUseCase.execute({
      queryParams,
      status,
    });
    return resultToHttp(result);
  }

  @Get(':containerId')
  async findContainerById(
    @Param('containerId') containerId: string,
  ): Promise<RequestResponse<Container>> {
    const result = await this.findContainerByIdUseCase.execute({ containerId });
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
