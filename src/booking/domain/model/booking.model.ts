import { AggregateRoot } from '@nestjs/cqrs';
import { UnprocessableEntityException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { PriceValue } from '../../../shared-kernel/valueObjects/priceValue';
import { Currency } from '../../../shared-kernel/valueObjects/currency';
import { BookingState } from './bookingState.enum';
import { PaymentState } from './paymentState.enum';
import { Check } from '../valueObjects/check.valueObject';

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
  private totalCost: PriceValue;
  private bookingState: BookingState;
  private paymentState: PaymentState;
  private registerDate: Date;
  private numberOfGuests: number;
  private numberOfDays: number;
  private costByNight: number;
  private checkInOut: Check;

  constructor(
    costByNight: number,
    numberOfGuests: number,
    propertyId: string,
    guestId: string,
    checkInDate: Date,
    checkOutDate: Date,
  ) {
    super();

    this.id = uuidv4();
    this.propertyId = propertyId;
    this.guestId = guestId;
    this.checkInOut = new Check(checkInDate, checkOutDate);
    this.numberOfDays = this.checkInOut.getNumberOfDays();

    const bookingTotalDayPrice = costByNight * this.numberOfDays;

    this.totalCost = new PriceValue(
      bookingTotalDayPrice * numberOfGuests,
      new Currency('BOB'),
    );
    this.bookingState = BookingState.PENDING;
    this.paymentState = PaymentState.PENDING;
    this.registerDate = new Date();
    this.numberOfGuests = numberOfGuests;
    this.costByNight = costByNight;
    this.apply(new BookingPendingEvent(this.id));
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
    if (this.bookingState === BookingState.CANCELLED) {
      throw new UnprocessableEntityException(
        `No se puedo completar el pago de una reserva completada`,
      );
    }

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

  public getPropertyId(): string {
    return this.propertyId;
  }

  public getCostByNight(): number {
    return this.costByNight;
  }

  public getTotalCost(): PriceValue {
    return this.totalCost;
  }

  public getBookingState(): BookingState {
    return this.bookingState;
  }

  public setBookingState(state): void {
    this.bookingState = state;
  }

  public getPaymentState(): PaymentState {
    return this.paymentState;
  }

  public setPaymentState(state): void {
    this.paymentState = state;
  }

  public getRegisterDate(): Date {
    return this.registerDate;
  }

  public getCheckInOut(): Check {
    return this.checkInOut;
  }

  public getNumberOfDays(): number {
    return this.numberOfDays;
  }
}
