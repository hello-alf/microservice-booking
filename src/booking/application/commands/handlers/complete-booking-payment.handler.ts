import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';

import { CompleteBookingPaymentCommand } from '../impl/complete-booking-payment.command';
import { BookingRepository } from '../../../infrastructure/mongoose/repositories/booking.repository';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@CommandHandler(CompleteBookingPaymentCommand)
export class CompleteBookingPaymentHandler
  implements ICommandHandler<CompleteBookingPaymentCommand>
{
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly publisher: EventPublisher,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async execute(command: CompleteBookingPaymentCommand) {
    try {
      const { id } = command;

      const booking = this.publisher.mergeObjectContext(
        await this.bookingRepository.findById(id),
      );

      booking.completePayment();

      await this.bookingRepository.findOneAndUpdate(id, {
        paymentState: booking.getPaymentState(),
      });

      // console.log('booking', booking);

      // await this.amqpConnection.publish(
      //   'booking-service:host-creado',
      //   '',
      //   booking,
      // );

      booking.commit();

      return booking;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
