export namespace CreateZone {
  export type Input = {
    code: string;
    type: string;
    isAvailable: boolean;
    unavailableReason: string;
  };
}

export class Zone {
  private constructor(
    private code: string,
    private type: string,
    private isAvailable: boolean,
    private unavailableReason: string,
  ) {}

  static create({
    code,
    type,
    isAvailable,
    unavailableReason,
  }: CreateZone.Input): Zone {
    return new Zone(code, type, isAvailable, unavailableReason);
  }

  public getCode(): string {
    return this.code;
  }

  public getType(): string {
    return this.type;
  }

  public getIsAvailable(): boolean {
    return this.isAvailable;
  }

  public getUnavailableReason(): string {
    return this.unavailableReason;
  }
}
