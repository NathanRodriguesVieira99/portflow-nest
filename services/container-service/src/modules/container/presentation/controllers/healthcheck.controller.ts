import { successResponse } from '@/shared/errors/responses/success-response';
import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller('/health')
export class Healthcheck {
  @Get()
  health() {
    return successResponse('Service: Container', HttpStatus.OK);
  }
}
