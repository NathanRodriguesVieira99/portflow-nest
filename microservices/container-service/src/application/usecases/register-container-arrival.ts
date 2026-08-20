import { Inject, Injectable, Logger } from '@nestjs/common';
import { Container } from '@/domain/entities/container.entity';
import { badRequest } from '@/application/exceptions/http-exceptions';
import { err, ok } from '@/@types/result';
import { SendPendingDocumentationEvent } from '@/external/messaging/producers/send-pending-documentation.event';
import { TerminalHttp } from './validate-terminal';
import type { Result } from '@/@types/result';
import type { StatusContainer } from '@/@types/status-container.type';
import {
  CONTAINER_REPOSITORY_CONTRACT,
  type PrismaContainerRepositoryContract,
} from '@/application/repositories/prisma/prisma-container.repository.contract';

@Injectable()
export class RegisterContainerArrivalService {
  private readonly logger = new Logger(RegisterContainerArrivalService.name);

  constructor(
    @Inject(CONTAINER_REPOSITORY_CONTRACT)
    private readonly repo: PrismaContainerRepositoryContract,
    private readonly terminal: TerminalHttp,
    private readonly kafka: SendPendingDocumentationEvent,
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
      this.logger.warn(terminalValidation.error.message);
      return err(terminalValidation.error);
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
      const error = badRequest('Invalid container arrival');
      this.logger.warn(error.message);
      return err(error);
    }

    const saved = await this.repo.save(container);

    if (!saved.ok) return saved;

    await this.kafka.sendPendingDocumentation(saved.value.getId());

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
