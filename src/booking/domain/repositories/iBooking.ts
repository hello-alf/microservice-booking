import { Booking } from '../model/booking.model';

export interface iBookingRepository {
  save: (booking: any) => any;

  findAvailableBooking: (
    propertyId: string,
    checkIn: Date,
    checkOut: Date,
  ) => Promise<any[]>;

  findById: (id: string) => any;

  findAll: () => Promise<any[]>;
}
