import { Container } from '../../../domain/models/container.model';
import { Container as PrismaContainer } from '../../../../../infrastructure/database/prisma/generated/client';

export class PrismaContainerMapper {
  /* Quando o dado vem do banco se usa o toDomain(). */
  static toDomain(raw: PrismaContainer) {
    return new Container({
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
      id: container.id,
      shipId: container.shipId,
      terminalId: container.terminalId,
      originCountry: container.originCountry,
      destinationCountry: container.destinationCountry,
      cargoType: container.cargoType,
      statusContainer: container.status,
      arrivalDate: container.arrivalDate,
      createdAt: container.createdAt,
      updatedAt: container.updatedAt,
    };
  }
}
