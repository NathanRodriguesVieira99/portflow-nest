import { Inject, Injectable, Logger } from '@nestjs/common';
import { badRequest } from '@/application/exceptions/exceptions';
import { Container } from '@/domain/entities/container.entity';
import { err, ok, type Result } from '@/domain/types/result';
import {
  CONTAINER_REPOSITORY_CONTRACT,
  type ContainerRepositoryContract,
} from '@/application/repositories/container.repository.contract';
import {
  SEND_DOCUMENTATION_EVENT_CONTRACT,
  type SendPendingDocumentationEventContract,
} from '@/application/events/send-pending-documentation.event.contract';
import {
  TERMINAL_HTTP_CONTRACT,
  type TerminalHttpContract,
} from '@/application/ports/http/validate-terminal';
import type { StatusContainer } from '@/domain/types/status-container.type';
import type { UseCase } from '../use-case';

export namespace ContainerArrival {
  export type Input = {
    containerId: string;
    shipId: string;
    terminalId: string;
    originCountry: string;
    destinationCountry: string;
    cargoType: string;
  };
  export type Output = {
    containerId: string;
    shipId: string;
    terminalId: string;
    originCountry: string;
    destinationCountry: string;
    cargoType: string;
    statusContainer: StatusContainer;
    arrivalDate: Date;
  };
}

@Injectable()
export class RegisterContainerArrivalUseCase implements UseCase<
  ContainerArrival.Input,
  Result<ContainerArrival.Output>
> {
  private readonly logger = new Logger(RegisterContainerArrivalUseCase.name);

  constructor(
    @Inject(CONTAINER_REPOSITORY_CONTRACT)
    private readonly repo: ContainerRepositoryContract,
    @Inject(SEND_DOCUMENTATION_EVENT_CONTRACT)
    private readonly kafka: SendPendingDocumentationEventContract,
    @Inject(TERMINAL_HTTP_CONTRACT)
    private readonly terminal: TerminalHttpContract,
  ) {}

  async execute({
    containerId,
    shipId,
    terminalId,
    originCountry,
    destinationCountry,
    cargoType,
  }: ContainerArrival.Input): Promise<Result<ContainerArrival.Output>> {
    const terminalValidation = await this.terminal.validateTerminal({
      terminalId,
      cargoType,
    });

    if (!terminalValidation.ok) {
      return err(badRequest(terminalValidation.error.message));
    }

    const container = Container.create({
      id: containerId,
      shipId,
      terminalId,
      originCountry,
      destinationCountry,
      cargoType,
      status: 'PENDING_DOCUMENTATION',
      arrivalDate: new Date(),
    });

    try {
      container.validateArrival();
      this.logger.log(
        `Container ${container.getId()} arrived at terminal ${container.getTerminalId()}`,
      );
    } catch {
      return err(badRequest('INVALID_CONTAINER_ARRIVAL'));
    }

    const saved = await this.repo.save(container);

    if (!saved.ok) return saved;

    await this.kafka.sendPendingDocumentationEvent(saved.value.getId());

    return ok({
      containerId: saved.value.getId(),
      shipId: saved.value.getShipId(),
      terminalId: saved.value.getTerminalId(),
      originCountry: saved.value.getOriginCountry(),
      destinationCountry: saved.value.getDestinationCountry(),
      cargoType: saved.value.getCargoType(),
      arrivalDate: saved.value.getArrivalDate(),
      statusContainer: saved.value.getStatus(),
    });
  }
}
