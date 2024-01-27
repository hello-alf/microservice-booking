import { Test, TestingModule } from '@nestjs/testing';
import { GetBookingsQuery } from '../../../../../src/booking/application/queries/impl/get-bookings.query';
import { BookingRepository } from '../../../../../src/booking/infrastructure/mongoose/repositories/booking.repository';
import { GetBookingsHandler } from '../../../../../src/booking/application/queries/handlers/get-bookings.handler';

class MockBookingRepository {
  findAll() {
    return ['Host1', 'Host2', 'Host3'];
  }

  findById() {
    return 'Host1';
  }
}

describe('GetBookingsHandler', () => {
  let handler: GetBookingsHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetBookingsHandler,
        {
          provide: BookingRepository,
          useClass: MockBookingRepository,
        },
      ],
    }).compile();

    handler = module.get<GetBookingsHandler>(GetBookingsHandler);
  });

  it('Maneja GetBookingsQuery', async () => {
    const query = new GetBookingsQuery();

    const result = await handler.execute(query);

    expect(result).toEqual(['Host1', 'Host2', 'Host3']);
  });
});
