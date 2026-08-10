import { Module } from '@nestjs/common';
import { PrismaService } from '../persistence/database/prisma/prisma.service';
import { ContainerController } from '../controllers/container.controller';
import { HealthcheckController } from '../controllers/healthcheck.controller';
import { RegisterContainerArrivalService } from '../../application/usecases/register-container-arrival';
import { UpdateContainerStatusService } from '../../application/usecases/update-container-status';
import { RemoveContainerService } from '../../application/usecases/remove-container';
import { FindContainerByIdService } from '../../application/usecases/find-container-by-id';
import { FindAllContainersService } from '../../application/usecases/find-all-containers';
import { FindContainerByStatusService } from '../../application/usecases/find-container-by-status';
import { ClsService } from 'nestjs-cls';
import { PrismaContainerRepositoryImplementation } from '../persistence/repositories/prisma/prisma-container.repository.implementation';
import { AxiosAdapter, HTTP_CLIENT } from '../../external/http/axios.adapter';
import { CONTAINER_REPOSITORY_CONTRACT } from '../../application/repositories/prisma/prisma-container.repository.contract';
import { CockatielAdapter } from '../../external/resilience/cockatiel.adapter';
import { RESILIENCE } from '../../application/ports/resilience';
import { TerminalHttp } from '@/application/usecases/validate-terminal';
import { MessagingModule } from '../messaging/messaging.module';

@Module({
  imports: [MessagingModule],
  providers: [
    PrismaService,
    RegisterContainerArrivalService,
    UpdateContainerStatusService,
    RemoveContainerService,
    FindContainerByIdService,
    FindAllContainersService,
    FindContainerByStatusService,
    TerminalHttp,
    {
      provide: HTTP_CLIENT,
      inject: [ClsService],
      useFactory: (cls: ClsService) => AxiosAdapter.create(cls),
    },
    {
      provide: RESILIENCE,
      useFactory: () => CockatielAdapter.create(),
    },
    {
      provide: CONTAINER_REPOSITORY_CONTRACT,
      useClass: PrismaContainerRepositoryImplementation,
    },
  ],
  controllers: [ContainerController, HealthcheckController],
})
export class ContainerModule {}
