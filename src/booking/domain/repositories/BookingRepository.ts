import { Booking } from '../model/booking.model';

export interface BookingRepository {
  newId: () => Promise<string>;
  save: (account: Booking) => Promise<void>;
  findById: (id: string) => Promise<Booking | null>;
}
