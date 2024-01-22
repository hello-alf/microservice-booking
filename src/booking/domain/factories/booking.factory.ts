import { Injectable } from '@nestjs/common';
import { iBooking } from './iBooking';
import { Booking } from '../model/booking.model';
import { Guest } from '../model/guest.model';

@Injectable()
export class BookingFactory implements iBooking {
  createBooking(
    costo: number,
    numberOfGuests: number,
    propertyId: string,
    guest: Guest,
    checkInDate: Date,
    checkOutDate: Date,
  ) {
    return new Booking(
      costo,
      numberOfGuests,
      propertyId,
      guest,
      checkInDate,
      checkOutDate,
    );
  }
}
