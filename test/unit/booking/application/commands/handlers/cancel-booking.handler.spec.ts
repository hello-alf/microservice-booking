import { BadRequestException } from '@nestjs/common';
import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CancelBookingHandler } from '../../../../../../src/booking/application/commands/handlers/cancel-booking.handler';
import { CancelBookingCommand } from '../../../../../../src/booking/application/commands/impl/cancel-booking.command';
import { BookingRepository } from '../../../../../../src/booking/infrastructure/mongoose/repositories/booking.repository';
import { BookingFactory } from '../../../../../../src/booking/domain/factories/booking.factory';

class MockEventPublisher {
  mergeObjectContext() {
    return {
      commit: jest.fn(),
      cancelBooking: jest.fn(),
      getBookingState: jest.fn(),
    };
  }
}

class MockHostRepository {
  findById(id) {
    if (id === '123') {
      return {};
    }

    throw new BadRequestException('Booking not found');
  }

  findOneAndUpdate() {
    return {};
  }
}

class MockBookingFactory {}

describe('CancelBookingHandler', () => {
  let handler: ICommandHandler<CancelBookingCommand>;
  let repository: BookingRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CancelBookingHandler,
        {
          provide: BookingRepository,
          useClass: MockHostRepository,
        },
        {
          provide: EventPublisher,
          useClass: MockEventPublisher,
        },
        {
          provide: BookingFactory,
          useClass: MockBookingFactory,
        },
      ],
    }).compile();

    handler =
      module.get<ICommandHandler<CancelBookingCommand>>(CancelBookingHandler);
    repository = module.get<BookingRepository>(BookingRepository);
  });

  it('Debe estar definido', () => {
    expect(handler).toBeDefined();
  });

  it('Booking cancel', async () => {
    const bookingId = '123';

    const command = new CancelBookingCommand(bookingId);

    const result = await handler.execute(command);

    expect(result).toBeDefined();
  });

  it('Mostrar error BadRequestException', async () => {
    const bookingId = '1234546';

    const command = new CancelBookingCommand(bookingId);

    await expect(handler.execute(command)).rejects.toThrowError(
      BadRequestException,
    );

    jest
      .spyOn(MockHostRepository.prototype, 'findOneAndUpdate')
      .mockRejectedValueOnce(new Error('Test Error') as never);
  });
});
