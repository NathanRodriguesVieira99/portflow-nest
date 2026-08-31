import { Controller, Get } from '@nestjs/common';
import { successResponse } from '@/infra/http/http-responses';
import { Http } from '@/domain/types/http';

@Controller('/health')
export class HealthcheckController {
  @Get()
  health() {
    return successResponse('Container service UP!', Http.Codes.OK, 'OK');
  }
}
