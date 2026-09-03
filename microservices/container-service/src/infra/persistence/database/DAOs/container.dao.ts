/*
 * DAO é uma abstração do acesso aos dados brutos que define as operações no banco de dados.
 * Ele deve receber e retornar DTOs, nunca entidades de Domain.
 */

import type { Pagination } from '@/domain/types/pagination';
import type { Result } from '@/domain/types/result';
import type { StatusContainer } from '@/domain/types/status-container.type';

export interface ContainerDAO {
  save(dto: ContainerDAO.SaveDTO): Promise<Result<ContainerDAO.ContainerDTO>>;
  update(
    dto: ContainerDAO.UpdateDTO,
  ): Promise<Result<ContainerDAO.ContainerDTO>>;
  remove(containerId: string): Promise<Result<string>>;
  findById(containerId: string): Promise<Result<ContainerDAO.ContainerDTO>>;
  findAll(
    queryParams: ContainerDAO.FindAllDTO,
  ): Promise<Result<Pagination.Output<ContainerDAO.ContainerDTO>>>;
  findByStatus({
    queryParams,
    status,
  }: ContainerDAO.FindByStatusDTO): Promise<
    Result<Pagination.Output<ContainerDAO.ContainerDTO>>
  >;
}

export namespace ContainerDAO {
  export type ContainerDTO = {
    id: string;
    shipId: string;
    terminalId: string;
    originCountry: string;
    destinationCountry: string;
    cargoType: string;
    status: StatusContainer;
    arrivalDate: Date;
    createdAt: Date;
    updatedAt: Date;
  };
  export type SaveDTO = {
    id: string;
    shipId: string;
    terminalId: string;
    originCountry: string;
    destinationCountry: string;
    cargoType: string;
    status: StatusContainer;
    arrivalDate: Date;
    createdAt: Date;
    updatedAt: Date;
  };
  export type UpdateDTO = {
    id: string;
    shipId: string;
    terminalId: string;
    originCountry: string;
    destinationCountry: string;
    cargoType: string;
    status: StatusContainer;
    arrivalDate: Date;
    createdAt: Date;
    updatedAt: Date;
  };
  export type FindAllDTO = { queryParams: Pagination.Input };
  export type FindByStatusDTO = {
    queryParams: Pagination.Input;
    status: StatusContainer;
  };
}


export const CONTAINER_DAO_CONTRACT = Symbol('ContainerDAOContract')
