import { Capacity } from './capacity';
import { Restriction } from './restriction';
import { Zone } from './zone';

export namespace CreateTerminal {
  export type Input = {
    terminalId: string;
    name: string;
    isActive: boolean;
    acceptedCargoTypes: string[];
    capacity: Capacity;
    zones: Zone[];
    restrictions: Restriction;
    equipments: string[];
    createdAt?: Date;
    updatedAt?: Date;
  };
}

export class Terminal {
  private constructor(
    private terminalId: string,
    private name: string,
    private isActive: boolean,
    private acceptedCargoTypes: string[],
    private capacity: Capacity,
    private zones: Zone[],
    private restrictions: Restriction,
    private equipments: string[],
    private createdAt: Date,
    private updatedAt: Date,
  ) {}

  static create({
    terminalId,
    name,
    isActive,
    acceptedCargoTypes,
    capacity,
    zones,
    restrictions,
    equipments,
    createdAt,
    updatedAt,
  }: CreateTerminal.Input): Terminal {
    const now = new Date();

    return new Terminal(
      terminalId,
      name,
      isActive,
      acceptedCargoTypes,
      capacity,
      zones,
      restrictions,
      equipments,
      createdAt ?? now,
      updatedAt ?? now,
    );
  }

  static restore({
    terminalId,
    name,
    isActive,
    acceptedCargoTypes,
    capacity,
    zones,
    restrictions,
    equipments,
    createdAt,
    updatedAt,
  }: CreateTerminal.Input): Terminal {
    return new Terminal(
      terminalId,
      name,
      isActive,
      acceptedCargoTypes,
      capacity,
      zones,
      restrictions,
      equipments,
      createdAt!,
      updatedAt!,
    );
  }

  public getTerminalId(): string {
    return this.terminalId;
  }

  public getName(): string {
    return this.name;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public getAcceptedCargoTypes(): string[] {
    return this.acceptedCargoTypes;
  }

  public getCapacity(): Capacity {
    return this.capacity;
  }

  public getZones(): Zone[] {
    return this.zones;
  }

  public getRestrictions(): Restriction {
    return this.restrictions;
  }

  public getEquipments(): string[] {
    return this.equipments;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public acceptCargoType(cargoType: string): boolean {
    if (!cargoType) return false;
    return this.acceptedCargoTypes.includes(cargoType.toUpperCase());
  }
}
