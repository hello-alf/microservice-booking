import { Test, TestingModule } from '@nestjs/testing';
import { GetBookingQuery } from '../../../../../src/booking/application/queries/impl/get-booking.query';
import { BookingRepository } from '../../../../../src/booking/infrastructure/mongoose/repositories/booking.repository';
import { GetPropertyHandler } from '../../../../../src/booking/application/queries/handlers/get-booking.handler';

class MockBookingRepository {
  findAll() {
    return ['Host1', 'Host2', 'Host3'];
  }

  findById() {
    return 'Host1';
  }
}

describe('GetPropertyHandler', () => {
  let handler: GetPropertyHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPropertyHandler,
        {
          provide: BookingRepository,
          useClass: MockBookingRepository,
        },
      ],
    }).compile();

    handler = module.get<GetPropertyHandler>(GetPropertyHandler);
  });

  it('Maneja GetBookingQuery', async () => {
    const query = new GetBookingQuery('123');

    const result = await handler.execute(query);

    expect(result).toEqual('Host1');
  });
});
