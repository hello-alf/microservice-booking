import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';

import { CancelBookingCommand } from '../impl/cancel-booking.command';
import { BookingRepository } from '../../../infrastructure/mongoose/repositories/booking.repository';

@CommandHandler(CancelBookingCommand)
export class CancelBookingHandler
  implements ICommandHandler<CancelBookingCommand>
{
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CancelBookingCommand) {
    try {
      const { id } = command;

      const booking = this.publisher.mergeObjectContext(
        await this.bookingRepository.findById(id),
      );

      booking.cancelBooking();

      await this.bookingRepository.findOneAndUpdate(id, {
        bookingState: booking.getBookingState(),
      });

      booking.commit();

      return booking;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
