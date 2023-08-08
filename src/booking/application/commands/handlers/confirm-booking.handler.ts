import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';

import { ConfirmBookingCommand } from '../impl/confirm-booking.command';
import { BookingRepository } from '../../../infrastructure/mongoose/repositories/booking.repository';

@CommandHandler(ConfirmBookingCommand)
export class ConfirmBookingHandler
  implements ICommandHandler<ConfirmBookingCommand>
{
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: ConfirmBookingCommand) {
    try {
      const { id } = command;

      const booking = this.publisher.mergeObjectContext(
        await this.bookingRepository.findById(id),
      );

      booking.confirmBooking();

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
