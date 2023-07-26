import { AggregateRoot } from '@nestjs/cqrs';
import { UnprocessableEntityException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { PriceValue } from '../../../shared-kernel/valueObjects/priceValue';
import { Currency } from '../../../shared-kernel/valueObjects/currency';
import { BookingState } from './bookingState.enum';
import { PaymentState } from './paymentState.enum';

import { BookingPendingEvent } from '../events/bookingPendingEvent';
import { BookingConfirmEvent } from '../events/bookingConfirmEvent';
import { BookingCancelEvent } from '../events/bookingCancelEvent';

export class Booking extends AggregateRoot {
  private id: string;
  private propertyId: string;
  private guestId: string;
  private costo: PriceValue;
  private bookingState: BookingState;
  private paymentState: PaymentState;
  private registerDate: Date;
  private numberOfGuests: number;
  private checkInDate: Date;
  private checkOutDate: Date;

  constructor(
    costo: number,
    numberOfGuests: number,
    propertyId: string,
    guestId: string,
  ) {
    super();
    this.id = uuidv4();
    this.propertyId = propertyId;
    this.guestId = guestId;
    this.costo = new PriceValue(costo, new Currency('BOB'));
    this.bookingState = BookingState.PENDING;
    this.paymentState = PaymentState.PENDING;
    this.registerDate = new Date();
    this.numberOfGuests = numberOfGuests;
    this.checkInDate = null;
    this.checkOutDate = null;
    this.apply(new BookingPendingEvent(this.id));
  }

  public checkIn(checkInDate: Date): void {
    this.checkInDate = checkInDate;
  }

  public checkOut(checkOutDate: Date): void {
    this.checkOutDate = checkOutDate;
  }

  public confirmBooking(): void {
    if (
      [BookingState.CONFIRMED, BookingState.CANCELLED].includes(
        this.bookingState,
      )
    ) {
      throw new UnprocessableEntityException(
        `El estado inicial de la reserva es diferente a ${this.bookingState}`,
      );
    }
    this.bookingState = BookingState.CONFIRMED;
    this.apply(new BookingConfirmEvent(this.id));
  }

  public cancelBooking(): void {
    if (this.bookingState === BookingState.CANCELLED) {
      throw new UnprocessableEntityException(
        `El estado ya esta ${BookingState.CANCELLED}`,
      );
    }
    this.bookingState = BookingState.CANCELLED;
    this.apply(new BookingCancelEvent(this.id));
  }

  public addNumberOfGuests(): void {
    console.log('agregar huespedes');
  }
}
