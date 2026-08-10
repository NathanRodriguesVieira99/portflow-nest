import { successResponse } from '@/utils/http-responses';
import { Controller, Get } from '@nestjs/common';

@Controller('/health')
export class HealthcheckController {
  @Get()
  health() {
    return successResponse('Container service UP!', 'OK');
  }
}
