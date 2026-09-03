/*
 * Este repository implementa o contrato e orquestra o fluxo de receber uma entidade da camada de Domain, converte-la para DTO, repassa para o DAO e recebe o resultado (DTO) de volta, reconstruindo a entidade.
 * Não deve possuir lógica de banco de dados (apenas transforma os dados) e deve depender de um DAO.
 * O método .restore() nos retornos reconstrói a entidade a partir de dados vindos do banco, preservando as regras de negócio e isolando o banco na camada de infra.
 */

import { Inject } from '@nestjs/common';
import { Container } from '@/domain/entities/container.entity';
import { notFound } from '@/application/exceptions/exceptions';
import type { ContainerRepository } from '@/application/repositories/container.repository';
import type { Pagination } from '@/domain/types/pagination';
import { err, ok, type Result } from '@/domain/types/result';
import type { StatusContainer } from '@/domain/types/status-container.type';
import {
  CONTAINER_DAO_CONTRACT,
  type ContainerDAO,
} from '../DAOs/container.dao';

export class ContainerRepositoryDatabase implements ContainerRepository {
  constructor(
    @Inject(CONTAINER_DAO_CONTRACT) private readonly containerDao: ContainerDAO,
  ) {}

  async save(container: Container): Promise<Result<Container>> {
    const savedContainer = await this.containerDao.save({
      id: container.getId(),
      shipId: container.getShipId(),
      terminalId: container.getTerminalId(),
      originCountry: container.getOriginCountry(),
      destinationCountry: container.getDestinationCountry(),
      cargoType: container.getCargoType(),
      status: container.getStatus(),
      arrivalDate: container.getArrivalDate(),
      createdAt: container.getCreatedAt(),
      updatedAt: container.getUpdatedAt(),
    });
    if (!savedContainer.ok) return savedContainer;
    return ok(Container.restore(savedContainer.value));
  }

  async update(container: Container): Promise<Result<Container>> {
    const updatedContainer = await this.containerDao.update({
      id: container.getId(),
      shipId: container.getShipId(),
      terminalId: container.getTerminalId(),
      originCountry: container.getOriginCountry(),
      destinationCountry: container.getDestinationCountry(),
      cargoType: container.getCargoType(),
      status: container.getStatus(),
      arrivalDate: container.getArrivalDate(),
      createdAt: container.getCreatedAt(),
      updatedAt: container.getUpdatedAt(),
    });
    if (!updatedContainer.ok) return updatedContainer;
    return ok(Container.restore(updatedContainer.value));
  }

  async remove(containerId: string): Promise<Result<string>> {
    return await this.containerDao.remove(containerId);
  }

  async findById(containerId: string): Promise<Result<Container>> {
    const container = await this.containerDao.findById(containerId);
    if (!container.ok) return err(notFound('Container'));
    return ok(Container.restore(container.value));
  }

  async findAll(
    queryParams: Pagination.Input,
  ): Promise<Result<Pagination.Output<Container>>> {
    const containers = await this.containerDao.findAll({ queryParams });
    if (!containers.ok) return containers;
    return ok({
      ...containers.value,
      data: containers.value.data.map((c) => Container.restore(c)),
    });
  }

  async findByStatus(
    queryParams: Pagination.Input,
    status: StatusContainer,
  ): Promise<Result<Pagination.Output<Container>>> {
    const containers = await this.containerDao.findByStatus({
      queryParams,
      status,
    });
    if (!containers.ok) return containers;
    return ok({
      ...containers.value,
      data: containers.value.data.map((c) => Container.restore(c)),
    });
  }
}
