import { Booking } from '../model/booking.model';

export interface AccountRepository {
  newId: () => Promise<string>;
  save: (account: Booking) => Promise<void>;
  findById: (id: string) => Promise<Booking | null>;
}
