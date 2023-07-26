import { AggregateRoot } from '@nestjs/cqrs';
import { PositiveValue } from '../../../shared-kernel/valueObjects/positiveValue';

export class Property extends AggregateRoot {
  private name: string;
  private pricePerNight: PositiveValue;

  constructor(name: string, pricePerNight: number) {
    super();
    this.name = name;
    this.pricePerNight = new PositiveValue(pricePerNight);
  }
}
