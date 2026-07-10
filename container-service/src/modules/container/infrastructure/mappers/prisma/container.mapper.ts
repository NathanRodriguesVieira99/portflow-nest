import { Container } from '../../../domain/models/container.model';
import { Container as PrismaContainer } from '../../../../../infrastructure/database/prisma/generated/client';

export class PrismaContainerMapper {
  /* Quando o dado vem do banco se usa o toDomain(). */
  static toDomain(raw: PrismaContainer) {
    return Container.create({
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
    });
  }

  /* Quando o dado vai para o banco se usa toPrisma(). */
  static toPrisma(container: Container) {
    return {
      id: container.getId(),
      shipId: container.getShipId(),
      terminalId: container.getTerminalId(),
      originCountry: container.getOriginCountry(),
      destinationCountry: container.getDestinationCountry(),
      cargoType: container.getCargoType(),
      statusContainer: container.getStatus(),
      arrivalDate: container.getArrivalDate(),
      createdAt: container.getCreatedAt(),
      updatedAt: container.getUpdatedAt(),
    };
  }
}
