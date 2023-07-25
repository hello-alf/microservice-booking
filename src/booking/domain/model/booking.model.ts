import { PriceValue } from '../../../shared-kernel/valueObjects/priceValue';
import { Currency } from '../../../shared-kernel/valueObjects/currency';
import { AggregateRoot } from '../../../shared-kernel/core/aggregateRoot';
import { BookingState } from './bookingState.enum';
import { PaymentState } from './paymentState.enum';

export class Booking extends AggregateRoot {
  private costo: PriceValue;
  private bookingState: BookingState;
  private paymentState: PaymentState;
  private registerDate: Date;
  private numberOfGuests: number;
  private checkInDate: Date;
  private checkOutDate: Date;

  constructor(costo: number, numberOfGuests: number) {
    super();

    this.costo = new PriceValue(costo, new Currency('BOB'));
    this.bookingState = BookingState.PENDING;
    this.paymentState = PaymentState.PENDING;
    this.registerDate = new Date();
    this.numberOfGuests = numberOfGuests;
    this.checkInDate = null;
    this.checkOutDate = null;
  }

  public checkIn(checkInDate: Date): void {
    this.checkInDate = checkInDate;
  }

  public checkOut(checkOutDate: Date): void {
    this.checkOutDate = checkOutDate;
  }

  public confirmBooking(): void {
    console.log('confirmar booking');
  }

  public cancelBooking(): void {
    console.log('cancelar booking');
  }

  public addNumberOfGuests(): void {
    console.log('agregar huespedes');
  }
}
