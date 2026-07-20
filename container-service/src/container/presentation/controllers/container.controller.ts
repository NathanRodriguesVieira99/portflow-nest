import {
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  HttpException,
  Controller,
} from '@nestjs/common';
// import { WithDocs } from 'nestjs-docfy';
import { Container } from '@Models/container.model';
import { ContainerService } from '@Services/container.service';
import { errorResponse } from '@Shared/responses/error-response';
import { successResponse } from '@Shared/responses/success-response';

import type { PaginationOutput } from '@Contracts/pagination.output';
import type { PaginationInput } from '@Contracts/pagination.input';
import type { StatusContainer } from '@Types/status-container.type';
import type { ContainerArrivalRequestDto } from '@Dtos/container-arrival-request.dto';
import type { ContainerArrivalResponseDto } from '@Dtos/container-arrival-response.dto';
import type { RequestResponse } from '@Shared/responses/response';

// @WithDocs()
@Controller('containers')
export class ContainerController {
  constructor(private readonly containerService: ContainerService) {}

  @Post('/arrivals')
  async registerContainerArrival(
    @Body() dto: ContainerArrivalRequestDto,
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

  @Delete(':containerId')
  async removeContainer(
    @Param('containerId') containerId: string,
  ): Promise<RequestResponse<string>> {
    const result = await this.containerService.remove(containerId);
    if (!result.ok) {
      throw new HttpException(
        errorResponse(result.error.code, result.error.message),
        result.error.status,
      );
    }
    return successResponse(result.value, 'OK');
  }

  @Get()
  async findAllContainers(
    @Query() queryParams: PaginationInput,
  ): Promise<RequestResponse<PaginationOutput<Container>>> {
    const result = await this.containerService.findAll(queryParams);
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
  ): Promise<RequestResponse<PaginationOutput<Container | undefined>>> {
    const result = await this.containerService.findByStatus(
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
    const result = await this.containerService.findById(containerId);
    if (!result.ok) {
      throw new HttpException(
        errorResponse(result.error.code, result.error.message),
        result.error.status,
      );
    }
    return successResponse(result.value, 'OK');
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
    if (!result.ok) {
      throw new HttpException(
        errorResponse(result.error.code, result.error.message),
        result.error.status,
      );
    }
    return successResponse(result.value, 'OK');
  }
}
