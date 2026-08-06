import { Controller, Get } from '@nestjs/common';
import { successResponse } from '@Shared/responses';

@Controller('/health')
export class HealthcheckController {
  @Get()
  health() {
    return successResponse('Terminal service UP!', 'OK');
  }
}
