import { Booking } from '../model/booking.model';

export interface iBookingRepository {
  save: (booking: any) => any;

  findById: (id: string) => Promise<any | null>;

  findAll: () => Promise<any[]>;
}
