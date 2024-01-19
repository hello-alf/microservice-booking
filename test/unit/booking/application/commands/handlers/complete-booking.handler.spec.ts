import { BadRequestException } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CompleteBookingPaymentHandler } from '../../../../../../src/booking/application/commands/handlers/complete-booking-payment.handler';
import { CompleteBookingPaymentCommand } from '../../../../../../src/booking/application/commands/impl/complete-booking-payment.command';
import { BookingRepository } from '../../../../../../src/booking/infrastructure/mongoose/repositories/booking.repository';

describe('CancelBookingHandler', () => {
  let completeBookingHandler: CompleteBookingPaymentHandler;
  let bookingRepository: BookingRepository;
  let eventPublisher: EventPublisher;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompleteBookingPaymentHandler,
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

    completeBookingHandler = module.get<CompleteBookingPaymentHandler>(
      CompleteBookingPaymentHandler,
    );
    bookingRepository = module.get<BookingRepository>(BookingRepository);
    eventPublisher = module.get<EventPublisher>(EventPublisher);
  });

  it('Debe estar definido', () => {
    expect(completeBookingHandler).toBeDefined();
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
    const completeBookingCommand = new CompleteBookingPaymentCommand(bookingId);
    // Execute the handler and expect it to throw a BadRequestException
    await expect(
      completeBookingHandler.execute(completeBookingCommand),
    ).rejects.toThrowError(BadRequestException);
  });
});
