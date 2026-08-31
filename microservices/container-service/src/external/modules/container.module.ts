import { Module } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { CONTAINER_REPOSITORY_CONTRACT } from '@/application/repositories/container.repository.contract';
import { PrismaService } from '@/external/persistence/database/prisma/prisma.service';
import { ContainerController } from '@/infra/http/controllers/container.controller';
import { HealthcheckController } from '@/infra/http/controllers/healthcheck.controller';
import { RESILIENCE } from '@/application/ports/resilience/resilience';
import { FindContainerByIdUseCase } from '../../application/usecases/container/find-container-by-id';
import { FindContainerByStatusUseCase } from '../../application/usecases/container/find-container-by-status';
import { UpdateContainerStatusUseCase } from '../../application/usecases/container/update-container-status';
import { AxiosAdapter, HTTP_CLIENT } from '../../external/http/axios.adapter';
import { MessagingModule } from '../../external/messaging/messaging.module';
import { CockatielAdapter } from '../../external/resilience/cockatiel.adapter';
import { TerminalHttp } from '../../external/http/validate-terminal';
import { PrismaContainerRepositoryImplementation } from '../../external/persistence/repositories/prisma/prisma-container.repository.implementation';
import { TERMINAL_HTTP_CONTRACT } from '@/application/ports/http/validate-terminal';
import { RegisterContainerArrivalUseCase } from '@/application/usecases/container/register-container-arrival';
import { RemoveContainerUseCase } from '@/application/usecases/container/remove-container';
import { FindAllContainersUseCase } from '@/application/usecases/container/find-all-containers';

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
    {
      provide: TERMINAL_HTTP_CONTRACT,
      useClass: TerminalHttp,
    },
  ],
  controllers: [ContainerController, HealthcheckController],
})
export class ContainerModule {}
