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
import { CheckInEvent } from '../events/checkInEvent';
import { CheckOutEvent } from '../events/checkOutEvent';
import { PaymentRevertedEvent } from '../events/paymentRevertedEvent';
import { PaymentCompleteEvent } from '../events/paymentCompleteEvent';
import { PaymentNoFundsEvent } from '../events/paymentNoFundsEvent';

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
    this.apply(new CheckInEvent(this.id));
  }

  public checkOut(checkOutDate: Date): void {
    this.checkOutDate = checkOutDate;
    this.apply(new CheckOutEvent(this.id));
  }

  public confirmBooking(): void {
    if (
      [BookingState.CONFIRMED, BookingState.CANCELLED].includes(
        this.bookingState,
      )
    ) {
      throw new UnprocessableEntityException(
        `El estado inicial de la reserva es diferente a ${BookingState.PENDING}`,
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

  public completePayment(): void {
    if (this.paymentState === PaymentState.COMPLETE) {
      throw new UnprocessableEntityException(
        `El pago ya fue realizado previamente`,
      );
    }
    this.paymentState = PaymentState.COMPLETE;
    this.apply(new PaymentCompleteEvent(this.id));
  }

  public noFundsPayment(): void {
    if (this.paymentState !== PaymentState.PENDING) {
      throw new UnprocessableEntityException(`El pago no esta pendiente`);
    }
    this.paymentState = PaymentState.NO_FUNDS;
    this.apply(new PaymentNoFundsEvent(this.id));
  }

  public revertedPayment(): void {
    if (this.paymentState !== PaymentState.COMPLETE) {
      throw new UnprocessableEntityException(
        `No se puede revertir el pago porque no se completo`,
      );
    }
    this.paymentState = PaymentState.REVERTED;
    this.apply(new PaymentRevertedEvent(this.id));
  }

  public addNumberOfGuests(numberOfGuests: number): void {
    if (this.numberOfGuests <= 0) {
      throw new UnprocessableEntityException(
        `Los huespedes a adicionar deben ser mayores o iguales a uno`,
      );
    }
    this.numberOfGuests = numberOfGuests;
  }

  public getNumberOfGuests(): number {
    return this.numberOfGuests;
  }
  public setNumberOfGuests(value: number) {
    this.numberOfGuests = value;
  }

  public getPropertyId(): string {
    return this.propertyId;
  }

  public setPropertyId(value: string): void {
    this.propertyId = value;
  }
}
