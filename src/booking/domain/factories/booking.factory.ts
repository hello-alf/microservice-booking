import { Injectable } from '@nestjs/common';
import { iBooking } from './iBooking';
import { Booking } from '../model/booking.model';

@Injectable()
export class BookingFactory implements iBooking {
  createBooking(
    costo: number,
    numberOfGuests: number,
    propertyId: string,
    guestId: string,
    checkInDate: Date,
    checkOutDate: Date,
  ) {
    return new Booking(
      costo,
      numberOfGuests,
      propertyId,
      guestId,
      checkInDate,
      checkOutDate,
    );
  }
}
