import { Module } from '@nestjs/common';
import { RegisterContainerArrivalUseCase } from '../../application/usecases/register-container-arrival';
import { UpdateContainerStatusUseCase } from '../../application/usecases/update-container-status';
import { RemoveContainerUseCase } from '../../application/usecases/remove-container';
import { FindContainerByIdUseCase } from '../../application/usecases/find-container-by-id';
import { FindAllContainersUseCase } from '../../application/usecases/find-all-containers';
import { FindContainerByStatusUseCase } from '../../application/usecases/find-container-by-status';
import { ClsService } from 'nestjs-cls';
import { AxiosAdapter, HTTP_CLIENT } from '../../external/http/axios.adapter';
import { CONTAINER_REPOSITORY_CONTRACT } from '../../application/repositories/prisma/prisma-container.repository.contract';
import { CockatielAdapter } from '../../external/resilience/cockatiel.adapter';
import { TerminalHttp } from '@/application/usecases/validate-terminal';
import { MessagingModule } from '../../external/messaging/messaging.module';
import { PrismaService } from '@/infra/persistence/database/prisma/prisma.service';
import { RESILIENCE } from '@/infra/resilience/resilience';
import { PrismaContainerRepositoryImplementation } from '@/infra/persistence/repositories/prisma/prisma-container.repository.implementation';
import { ContainerController } from '@/infra/controllers/container.controller';
import { HealthcheckController } from '@/infra/controllers/healthcheck.controller';

@Module({
  imports: [MessagingModule],
  providers: [
    PrismaService,
    RegisterContainerArrivalUseCase,
    UpdateContainerStatusUseCase,
    RemoveContainerUseCase,
    FindContainerByIdUseCase,
    FindAllContainersUseCase,
    FindContainerByStatusUseCase,
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
