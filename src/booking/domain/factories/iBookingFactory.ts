export interface iBookingFactory {
  createBooking(
    costo: number,
    numberOfGuests: number,
    propertyId: string,
    guestId: string,
  );
}
