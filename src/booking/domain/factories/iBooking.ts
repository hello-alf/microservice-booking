import { Guest } from '../model/guest.model';

export interface iBooking {
  createBooking(
    id: string,
    costo: number,
    numberOfGuests: number,
    propertyId: string,
    guest: Guest,
    checkInDate: Date,
    checkOutDate: Date,
    host: string,
  );
}
