import { Controller, Get } from '@nestjs/common';
import { successResponse } from '../../../../shared/responses/success-response';

@Controller('/health')
export class HealthcheckController {
  @Get()
  health() {
    return successResponse('Container service UP!', 'OK');
  }
}
