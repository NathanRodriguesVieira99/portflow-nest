export namespace CreateRestriction {
  export type Input = {
    acceptsDangerousCargo: boolean;
    acceptsRefrigeratedCargo: boolean;
    maxHeightInMeters: number;
    maxWeightInTons: number;
  };
}

export class Restriction {
  private constructor(
    private acceptsDangerousCargo: boolean,
    private acceptsRefrigeratedCargo: boolean,
    private maxHeightInMeters: number,
    private maxWeightInTons: number,
  ) {}

  static create({
    acceptsDangerousCargo,
    acceptsRefrigeratedCargo,
    maxHeightInMeters,
    maxWeightInTons,
  }: CreateRestriction.Input): Restriction {
    return new Restriction(
      acceptsDangerousCargo,
      acceptsRefrigeratedCargo,
      maxHeightInMeters,
      maxWeightInTons,
    );
  }

  public getAcceptsDangerousCargo(): boolean {
    return this.acceptsDangerousCargo;
  }

  public getAcceptsRefrigeratedCargo(): boolean {
    return this.acceptsRefrigeratedCargo;
  }

  public getMaxHeightInMeters(): number {
    return this.maxHeightInMeters;
  }

  public getMaxWeightInTons(): number {
    return this.maxWeightInTons;
  }
}
