import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { errorResponse } from '../../../../shared/errors/responses/error-response';
import { successResponse } from '../../../../shared/errors/responses/success-response';
import { Container } from '../../domain/models/container.model';
import { ContainerService } from '../../application/services/container.service';

import type { PaginationOutput } from '../../domain/contracts/pagination.output';
import type { RequestResponse } from '../../../../shared/errors/responses/response';
import type { PaginationInput } from '../../domain/contracts/pagination.input';
import type { StatusContainer } from '../../domain/types/status-container.type';
import type { ContainerArrivalRequestDto } from '../dtos/container-arrival-request.dto';
import type { ContainerArrivalResponseDto } from '../dtos/container-arrival-response.dto';

@Controller('containers')
export class ContainerController {
  constructor(private readonly containerService: ContainerService) {}

  @Post('/arrivals')
  async registerContainerArrival(
    @Body()
    dto: ContainerArrivalRequestDto,
  ): Promise<RequestResponse<ContainerArrivalResponseDto>> {
    const result = await this.containerService.registerContainerArrival(dto);
    if (!result.ok) {
      throw new HttpException(
        errorResponse(result.error.code, result.error.message),
        result.error.status,
      );
    }
    return successResponse(result.value, 'CREATED');
  }

  @Get()
  async findAllContainers(
    @Query() queryParams: PaginationInput,
  ): Promise<RequestResponse<PaginationOutput<Container>>> {
    const result = await this.containerService.findAllContainers(queryParams);
    if (!result.ok) {
      throw new HttpException(
        errorResponse(result.error.code, result.error.message),
        result.error.status,
      );
    }
    return successResponse(result.value, 'OK');
  }

  @Get('status')
  async findContainerByStatus(
    @Query() queryParams: PaginationInput,
    @Query('status') status: StatusContainer,
  ): Promise<RequestResponse<PaginationOutput<Container>>> {
    const result = await this.containerService.findContainerByStatus(
      queryParams,
      status,
    );
    if (!result.ok) {
      throw new HttpException(
        errorResponse(result.error.code, result.error.message),
        result.error.status,
      );
    }
    return successResponse(result.value, 'OK');
  }

  @Get(':containerId')
  async findContainerById(
    @Param('containerId') containerId: string,
  ): Promise<RequestResponse<Container>> {
    const result = await this.containerService.findContainerById(containerId);
    if (!result.ok) {
      throw new HttpException(
        errorResponse(result.error.code, result.error.message),
        result.error.status,
      );
    }
    return successResponse(result.value, 'OK');
  }

  @Put(':containerId/update-status')
  async updateContainerStatus(
    @Param('containerId') containerId,
    @Body('newStatus') newStatus: StatusContainer,
  ): Promise<RequestResponse<Container>> {
    const result = await this.containerService.updateContainerStatus({
      containerId,
      newStatus,
    });
    if (!result.ok) {
      throw new HttpException(
        errorResponse(result.error.code, result.error.message),
        result.error.status,
      );
    }
    return successResponse(result.value, 'OK');
  }
}
