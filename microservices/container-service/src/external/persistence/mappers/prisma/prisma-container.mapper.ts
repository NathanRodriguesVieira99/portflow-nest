import { Container as PrismaContainer } from '../../database/prisma/generated/client';
import type { ContainerDAO } from '@/infra/persistence/database/DAOs/container.dao';

export class PrismaContainerMapper {
  static toDTO(raw: PrismaContainer): ContainerDAO.ContainerDTO {
    return {
      id: raw.id,
      shipId: raw.shipId,
      terminalId: raw.terminalId,
      originCountry: raw.originCountry,
      destinationCountry: raw.destinationCountry,
      cargoType: raw.cargoType,
      status: raw.statusContainer,
      arrivalDate: raw.arrivalDate,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }
  static toPrisma(dto: ContainerDAO.SaveDTO) {
    return {
      id: dto.id,
      shipId: dto.shipId,
      terminalId: dto.terminalId,
      originCountry: dto.originCountry,
      destinationCountry: dto.destinationCountry,
      cargoType: dto.cargoType,
      statusContainer: dto.status,
      arrivalDate: dto.arrivalDate,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    };
  }
}
