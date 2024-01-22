export interface iBookingRepository {
  save: (booking: any, guest: any) => any;

  findAvailableBooking: (
    propertyId: string,
    checkIn: Date,
    checkOut: Date,
  ) => Promise<any[]>;

  findById: (id: string) => any;

  findAll: () => Promise<any[]>;
}
