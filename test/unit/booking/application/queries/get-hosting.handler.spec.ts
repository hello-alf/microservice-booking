import { Test, TestingModule } from '@nestjs/testing';
import { GetHostingQuery } from '../../../../../src/booking/application/queries/impl/get-hosting.query';
import { BookingRepository } from '../../../../../src/booking/infrastructure/mongoose/repositories/booking.repository';
import { GetHostingHandler } from '../../../../../src/booking/application/queries/handlers/get-hosting.handler';

class MockBookingRepository {
  findAll() {
    return ['Booking1', 'Booking2', 'Booking3'];
  }

  findById() {
    return 'Booking1';
  }

  findBookingMadeToHost() {
    return ['Booking1', 'Booking2'];
  }
}

describe('GetHostingHandler', () => {
  let handler: GetHostingHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetHostingHandler,
        {
          provide: BookingRepository,
          useClass: MockBookingRepository,
        },
      ],
    }).compile();

    handler = module.get<GetHostingHandler>(GetHostingHandler);
  });

  it('Maneja GetHostingQuery', async () => {
    const query = new GetHostingQuery('123');

    const result = await handler.execute(query);

    expect(result).toEqual(['Booking1', 'Booking2']);
  });
});
