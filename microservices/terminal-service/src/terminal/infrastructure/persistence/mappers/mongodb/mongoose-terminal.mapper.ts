import { Terminal } from '@/terminal/domain/models/terminal.model';
import { TerminalSchema } from '../../database/mongodb/schemas/terminal.schema';
import { Capacity } from '@/terminal/domain/models/capacity.model';
import { Zone } from '@/terminal/domain/models/zone.model';
import { Restriction } from '@/terminal/domain/models/restriction.model';

export class MongooseTerminalMapper {
  static toDomain(raw: TerminalSchema) {
    return Terminal.restore({
      id: raw.domainId,
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
    });
  }

  static toMongoose(terminal: Terminal) {
    return {
      id: terminal.getId(),
      terminalId: terminal.getTerminalId(),
      name: terminal.getName(),
      isActive: terminal.getIsActive(),
      acceptedCargoTypes: terminal.getAcceptedCargoTypes(),
      capacity: terminal.getCapacity(),
      zones: terminal.getZones(),
      restrictions: terminal.getRestrictions(),
      equipments: terminal.getEquipments(),
    };
  }
}
