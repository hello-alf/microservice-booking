import { PriceValue } from '../../../shared-kernel/valueObjects/priceValue';
import { Currency } from '../../../shared-kernel/valueObjects/currency';
import { AggregateRoot } from '../../../shared-kernel/core/aggregateRoot';

export class Booking extends AggregateRoot {
  private costo: PriceValue;
  private state: string;
  private checkInDate: Date;
  private checkOutDate: Date;
  private quantity: number;

  constructor(costo: number, quantity: number) {
    super();
    this.costo = new PriceValue(costo, new Currency('BOB'));
    this.state = '';
    this.checkInDate = null;
    this.checkOutDate = null;
    this.quantity = quantity;
  }

  public checkIn(): void {
    this.checkInDate = new Date();
  }

  public checkOut(): void {
    this.checkOutDate = new Date();
  }
}
