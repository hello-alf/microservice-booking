import { Test, TestingModule } from '@nestjs/testing';
import { GetTripsQuery } from '../../../../../src/booking/application/queries/impl/get-trips.query';
import { BookingRepository } from '../../../../../src/booking/infrastructure/mongoose/repositories/booking.repository';
import { GetTripsHandler } from '../../../../../src/booking/application/queries/handlers/get-trips.handler';

class MockBookingRepository {
  findAll() {
    return ['Booking1', 'Booking2', 'Booking3'];
  }

  findById() {
    return 'Booking1';
  }

  findBookingMadeByGuest() {
    return ['Booking1', 'Booking2'];
  }
}

describe('GetTripsHandler', () => {
  let handler: GetTripsHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetTripsHandler,
        {
          provide: BookingRepository,
          useClass: MockBookingRepository,
        },
      ],
    }).compile();

    handler = module.get<GetTripsHandler>(GetTripsHandler);
  });

  it('Maneja GetTripsQuery', async () => {
    const query = new GetTripsQuery('id');

    const result = await handler.execute(query);

    expect(result).toEqual(['Booking1', 'Booking2']);
  });
});
