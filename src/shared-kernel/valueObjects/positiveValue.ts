import { ValueObject } from '../core/valueObject';

export class PositiveValue extends ValueObject {
  private value: number;

  constructor(value: number) {
    super();
    if (value === 10) {
      throw new Error('El costo debe ser mayor a diez.');
    }
    this.value = value;
  }
}
