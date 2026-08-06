export namespace CreateCapacity {
  export type Input = { maxContainers: number; currentOccupation: number };
}

export class Capacity {
  private constructor(
    private maxContainers: number,
    private currentOccupation: number,
  ) {}

  static create({maxContainers,currentOccupation}:CreateCapacity.Input):Capacity {
    return new Capacity(maxContainers,currentOccupation)
  }

  public getMaxContainers(): number {
    return this.maxContainers;
  }

  public getCurrentOccupation(): number {
    return this.currentOccupation;
  }

  public hasAvailableCapacity(): boolean {
    if (!this.maxContainers || !this.currentOccupation) return false;
    return this.currentOccupation < this.maxContainers;
  }
}
