import { randomUUID } from 'node:crypto';
import { Capacity } from './capacity.model';
import { Restriction } from './restriction.model';
import { Zone } from './zone.model';

export namespace CreateTerminal {
  export type Input = {
    id?: string;
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
    private id: string,
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
    id,
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
      id ?? randomUUID(),
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
    id,
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
      id!,
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
    );
  }

  public getId(): string {
    return this.id;
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

  public acceptCargoType(cargoType: string): boolean {
    if (!cargoType) return false;
    return this.acceptedCargoTypes.includes(cargoType.toUpperCase());
  }
}
