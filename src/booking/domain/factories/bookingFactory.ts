import { iBookingFactory } from './iBookingFactory';
import { Booking } from '../model/booking.model';

export class BookingFactory implements iBookingFactory {
  createBooking(costo: number, numberOfGuests: number) {
    return new Booking(costo, numberOfGuests);
  }
}
