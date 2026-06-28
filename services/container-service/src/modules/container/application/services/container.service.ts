import { Injectable } from '@nestjs/common';

import { TerminalService } from './terminal.service';

import { ContainerProducer } from '../../presentation/events/container.producer';

import { ContainerRepositoryContract } from '../../domain/repositories/container.repository.contract';

@Injectable()
export class ContainerService {
  constructor(
    private readonly repository: ContainerRepositoryContract,
    private readonly terminal: TerminalService,
    private readonly kafka: ContainerProducer,
  ) {}

  async registerContainerArrival() {}
}
