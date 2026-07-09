import { Controller, Get } from '@nestjs/common';
import { WithDocs } from 'nestjs-docfy';
import { successResponse } from '../../../../shared/responses/success-response';

@WithDocs()
@Controller('/health')
export class HealthcheckController {
  @Get()
  health() {
    return successResponse('Container service UP!', 'OK');
  }
}
