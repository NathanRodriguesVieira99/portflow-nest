import { Controller, Get, HttpStatus } from '@nestjs/common';

import { successResponse } from '../../../../shared/errors/responses/success-response';

@Controller('/health')
export class Healthcheck {
  @Get()
  health() {
    return successResponse('Service: Container', HttpStatus.OK);
  }
}
