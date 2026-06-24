import { Module } from '@nestjs/common';
import { ContainerService } from './application/services/container/container.service';
import { ContainerController } from './presentation/controllers/container/container.controller';

@Module({
  providers: [ContainerService],
  controllers: [ContainerController],
})
export class ContainerModule {}
