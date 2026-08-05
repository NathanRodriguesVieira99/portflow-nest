import { Module } from '@nestjs/common';

import { HealthcheckController } from './presentation/controllers/healthcheck/healthcheck.controller';

@Module({ controllers: [HealthcheckController] })
export class TerminalModule {}
