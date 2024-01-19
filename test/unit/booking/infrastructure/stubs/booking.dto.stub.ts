import { CreateBookingDto } from 'src/booking/application/dtos/booking.dto';

export const ArticleDTOStub = (): CreateBookingDto => {
  return {
    propertyId: '5f9d88f4e5c4f0001c1d0b9d',
    numberOfGuests: 5,
    checkInDate: new Date('2020-11-01'),
    checkOutDate: new Date('2020-11-01'),
  };
};
