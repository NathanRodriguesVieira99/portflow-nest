import { Container } from '@/container/domain/models/container.model';
import { notFound } from '@/container/application/exceptions';
import { err, ok, type Result } from '@/shared/result';

import type { ContainerRepositoryContract } from '@Infra/persistence/repositories/prisma/container.repository.contract';
import type { StatusContainer } from '@/container/@types/status-container.type';
import type {
  PaginationInput,
  PaginationOutput,
} from '@/container/application/contracts/pagination';

export class ContainerRepositoryFake implements ContainerRepositoryContract {
  private containersList: Container[] = []; // simula o banco de dados

  async save(container: Container): Promise<Result<Container>> {
    const newContainer = Container.create({
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

    this.containersList.push(newContainer);

    return ok(newContainer);
  }

  async update(container: Container): Promise<Result<Container>> {
    const updatedContainer = Container.restore({
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

    this.containersList = this.containersList.map((c) =>
      c.getId() === updatedContainer.getId() ? updatedContainer : container,
    );

    return ok(updatedContainer);
  }

  async remove(containerId: string): Promise<Result<string>> {
    this.containersList.filter((c) => c.getId() !== containerId);
    return ok(`Container ${containerId} removed!`);
  }

  async findById(containerId: string): Promise<Result<Container>> {
    const raw = this.containersList.find((c) => c.getId() === containerId);
    if (!raw) return err(notFound('Container'));
    return ok(raw);
  }

  async findAll(
    queryParams: PaginationInput,
  ): Promise<Result<PaginationOutput<Container>>> {
    const { page = 1, perPage = 10 } = queryParams;

    const take = Number(perPage);
    const skip = Number((page - 1) * take);

    const data = this.containersList.slice(skip, skip + take);
    const totalItems = this.containersList.length;
    const totalPages = Math.ceil(totalItems / take);
    const hasNextPage = Boolean(page * take < totalItems);
    const hasPreviousPage = Boolean(page > 1);

    return ok({
      data,
      meta: {
        totalItems,
        page: Number(page),
        perPage: Number(perPage),
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    });
  }

  async findByStatus(
    queryParams: PaginationInput,
    status: StatusContainer,
  ): Promise<Result<PaginationOutput<Container>>> {
    const { page = 1, perPage = 10 } = queryParams;

    const take = Number(perPage);
    const skip = Number((page - 1) * take);

    const data = this.containersList
      .slice(skip, skip + take)
      .filter((s) => s.getStatus() === status);
    const totalItems = this.containersList.length;
    const totalPages = Math.ceil(totalItems / take);
    const hasNextPage = Boolean(page * take < totalItems);
    const hasPreviousPage = Boolean(page > 1);

    return ok({
      data,
      meta: {
        totalItems,
        page: Number(page),
        perPage: Number(perPage),
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    });
  }
}
