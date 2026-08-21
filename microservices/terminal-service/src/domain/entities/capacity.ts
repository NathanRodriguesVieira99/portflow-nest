import { DomainException } from '../exceptions/domain-exception';

export namespace CreateCapacity {
  export type Input = { maxContainers: number; currentOccupation: number };
}

export class Capacity {
  private constructor(
    private maxContainers: number,
    private currentOccupation: number,
  ) {}

  static create({
    maxContainers,
    currentOccupation,
  }: CreateCapacity.Input): Capacity {
    if (maxContainers <= 0) {
      throw new DomainException('maxContainers should be a positive number!');
    }
    if (currentOccupation < 0 || currentOccupation > maxContainers) {
      throw new DomainException('currentOccupation cannot exceed maxContainers');
    }
    return new Capacity(maxContainers, currentOccupation);
  }

  public getMaxContainers(): number {
    return this.maxContainers;
  }

  public getCurrentOccupation(): number {
    return this.currentOccupation;
  }

  // se a ocupacao atual for menor que a capacidade máxima de containers => true (há vagas).
  // se a ocupacao atual for zero => true (terminal vazio).
  // se a ocupacao atual for igual a capacidade máxima de containers => false (terminal lotado).
  public hasAvailableCapacity(): boolean {
    return this.currentOccupation < this.maxContainers;
  }
}
