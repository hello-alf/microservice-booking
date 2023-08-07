import { Booking } from '../model/booking.model';

export interface iBookingRepository {
  newId: () => Promise<string>;

  save: (booking: any) => Promise<void>;

  findById: (id: string) => Promise<any | null>;

  findAll: () => Promise<any[]>;
}
