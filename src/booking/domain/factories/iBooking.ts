export interface iBooking {
  createBooking(
    costo: number,
    numberOfGuests: number,
    propertyId: string,
    guestId: string,
  );
}
