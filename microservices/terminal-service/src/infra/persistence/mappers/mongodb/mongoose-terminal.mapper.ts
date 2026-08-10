import { Terminal } from '@/domain/entities/terminal';
import { TerminalSchema } from '../../database/mongodb/schemas/terminal.schema';
import { Capacity } from '@/domain/entities/capacity';
import { Zone } from '@/domain/entities/zone';
import { Restriction } from '@/domain/entities/restriction';

export class MongooseTerminalMapper {
  static toDomain(raw: TerminalSchema) {
    return Terminal.restore({
      terminalId: raw.terminalId,
      name: raw.name,
      isActive: raw.isActive,
      acceptedCargoTypes: raw.acceptedCargoTypes,
      capacity: Capacity.create({
        maxContainers: raw.capacity.maxContainers,
        currentOccupation: raw.capacity.currentOccupation,
      }),
      zones: raw.zones.map((z) =>
        Zone.create({
          code: z.code,
          type: z.type,
          isAvailable: z.isAvailable,
          unavailableReason: z.unavailableReason,
        }),
      ),
      restrictions: Restriction.create({
        acceptsDangerousCargo: raw.restrictions.acceptsDangerousCargo,
        acceptsRefrigeratedCargo: raw.restrictions.acceptsRefrigeratedCargo,
        maxHeightInMeters: raw.restrictions.maxHeightInMeters,
        maxWeightInTons: raw.restrictions.maxWeightInTons,
      }),
      equipments: raw.equipments,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toMongoose(terminal: Terminal) {
    return {
      terminalId: terminal.getTerminalId(),
      name: terminal.getName(),
      isActive: terminal.getIsActive(),
      acceptedCargoTypes: terminal.getAcceptedCargoTypes(),
      capacity: {
        maxContainers: terminal.getCapacity().getMaxContainers(),
        currentOccupation: terminal.getCapacity().getCurrentOccupation(),
      },
      zones: terminal.getZones().map((z) => ({
        code: z.getCode(),
        type: z.getType(),
        isAvailable: z.getIsAvailable(),
        unavailableReason: z.getUnavailableReason(),
      })),
      restrictions: {
        acceptsDangerousCargo: terminal
          .getRestrictions()
          .getAcceptsDangerousCargo(),
        acceptsRefrigeratedCargo: terminal
          .getRestrictions()
          .getAcceptsRefrigeratedCargo(),
        maxHeightInMeters: terminal.getRestrictions().getMaxHeightInMeters(),
        maxWeightInTons: terminal.getRestrictions().getMaxWeightInTons(),
      },
      equipments: terminal.getEquipments(),
      createdAt: terminal.getCreatedAt(),
      updatedAt: terminal.getUpdatedAt(),
    };
  }
}
