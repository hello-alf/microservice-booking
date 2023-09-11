import { BadRequestException } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmBookingHandler } from '../../../../../../src/booking/application/commands/handlers/confirm-booking.handler';
import { ConfirmBookingCommand } from '../../../../../../src/booking/application/commands/impl/confirm-booking.command';
import { BookingRepository } from '../../../../../../src/booking/infrastructure/mongoose/repositories/booking.repository';

describe('CancelBookingHandler', () => {
  let confirmBookingHandler: ConfirmBookingHandler;
  let bookingRepository: BookingRepository;
  let eventPublisher: EventPublisher;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfirmBookingHandler,
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

    confirmBookingHandler = module.get<ConfirmBookingHandler>(
      ConfirmBookingHandler,
    );
    bookingRepository = module.get<BookingRepository>(BookingRepository);
    eventPublisher = module.get<EventPublisher>(EventPublisher);
  });

  it('Debe estar definido', () => {
    expect(confirmBookingHandler).toBeDefined();
  });

  it('Booking cancel', async () => {
    const bookingId = '123';
    const mockBooking = {
      cancelBooking: jest.fn(),
      getBookingState: jest.fn(),
      commit: jest.fn,
    };

    // Mock the behavior of dependencies
    bookingRepository.findById(bookingId);
  });

  it('Mostrar error BadRequestException', async () => {
    const bookingId = 'bookingId';

    // Create a CompleteBookingCommand instance
    const confirmBookingCommand = new ConfirmBookingCommand(bookingId);

    // Execute the handler and expect it to throw a BadRequestException
    await expect(
      confirmBookingHandler.execute(confirmBookingCommand),
    ).rejects.toThrowError(BadRequestException);
  });
});
