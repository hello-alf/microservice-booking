import { ValueObject } from '../core/valueObject';

export class PositiveValue extends ValueObject {
  private value: number;

  constructor(value: number) {
    super();
    if (value <= 0) {
      throw new Error('El costo debe ser mayor que cero.');
    }
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}
