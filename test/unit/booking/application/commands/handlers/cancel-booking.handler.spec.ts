import { BadRequestException } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CancelBookingHandler } from '../../../../../../src/booking/application/commands/handlers/cancel-booking.handler';
import { CancelBookingCommand } from '../../../../../../src/booking/application/commands/impl/cancel-booking.command';
import { BookingRepository } from '../../../../../../src/booking/infrastructure/mongoose/repositories/booking.repository';

describe('CancelBookingHandler', () => {
  let cancelBookingHandler: CancelBookingHandler;
  let bookingRepository: BookingRepository;
  let eventPublisher: EventPublisher;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CancelBookingHandler,
        {
          provide: BookingRepository,
          useValue: {
            findById: jest.fn(),
            findOneAndUpdate: jest.fn(),
          },
        },
        {
          provide: EventPublisher,
          useValue: {
            mergeObjectContext: jest.fn(),
          },
        },
      ],
    }).compile();

    cancelBookingHandler =
      module.get<CancelBookingHandler>(CancelBookingHandler);
    bookingRepository = module.get<BookingRepository>(BookingRepository);
    eventPublisher = module.get<EventPublisher>(EventPublisher);
  });

  it('Debe estar definido', () => {
    expect(cancelBookingHandler).toBeDefined();
  });

  it('Booking cancel', async () => {
    const bookingId = '123';

    bookingRepository.findById(bookingId);
  });

  it('Mostrar error BadRequestException', async () => {
    const bookingId = '123';

    const cancelBookingCommand = new CancelBookingCommand(bookingId);

    // Execute the handler and expect it to throw a BadRequestException
    await expect(
      cancelBookingHandler.execute(cancelBookingCommand),
    ).rejects.toThrowError(BadRequestException);
  });
});
