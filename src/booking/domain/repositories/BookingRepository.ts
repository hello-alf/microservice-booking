import { Injectable } from '@nestjs/common';
import { Booking } from '../model/booking.model';

@Injectable()
export class BookingRepository {
  newId: () => Promise<string>;
  save: (account: Booking) => Promise<void>;
  findById: (id: string) => Promise<Booking | null>;
  findAll: () => Promise<Booking | null>;
}
