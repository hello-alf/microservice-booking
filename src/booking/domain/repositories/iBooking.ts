import { Booking } from '../model/booking.model';

export interface iBookingRepository {
  save: (booking: any) => any;

  findAvailableBooking: (
    propertyId: string,
    checkIn: Date,
    checkOut: Date,
  ) => Promise<any[]>;

  findById: (id: string) => Promise<any | null>;

  findAll: () => Promise<any[]>;
}
