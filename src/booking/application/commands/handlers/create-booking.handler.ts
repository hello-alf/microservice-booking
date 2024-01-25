import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';

import { CreateBookingCommand } from '../impl/create-booking.command';
import { BookingRepository } from '../../../infrastructure/mongoose/repositories/booking.repository';
import { PropertyRepository } from '../../../infrastructure/mongoose/repositories/property.repository';
import { BookingError } from '../../../domain/errors/bookingError';
import { BookingFactory } from '../../../domain/factories/booking.factory';
import { GuestRepository } from 'src/booking/infrastructure/mongoose/repositories/guest.repository';

@CommandHandler(CreateBookingCommand)
export class CreateBookingHandler
  implements ICommandHandler<CreateBookingCommand>
{
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly guestRepository: GuestRepository,
    private readonly propertyRepository: PropertyRepository,
    private readonly bookingFactory: BookingFactory,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateBookingCommand) {
    try {
      const { createBookingRequest } = command;

      const property = await this.propertyRepository.findById(
        createBookingRequest.propertyId,
      );

      if (!property)
        throw new NotFoundException(BookingError.PROPERTY_NOT_FOUND);

      const guest = await this.guestRepository.findById(
        createBookingRequest.guest,
      );

      if (!guest) throw new NotFoundException(BookingError.PROPERTY_NOT_FOUND);

      const availableBooking =
        await this.bookingRepository.findAvailableBooking(
          createBookingRequest.propertyId,
          createBookingRequest.checkInDate,
          createBookingRequest.checkOutDate,
        );

      if (availableBooking.length > 0)
        throw new UnprocessableEntityException(BookingError.BUSY_BOOKING);

      const bookingObject = this.bookingFactory.createBooking(
        '',
        property.pricePerNight,
        createBookingRequest.numberOfGuests,
        createBookingRequest.propertyId,
        guest,
        createBookingRequest.checkInDate,
        createBookingRequest.checkOutDate,
        property.host,
      );

      const booking = this.publisher.mergeObjectContext(
        this.bookingRepository.save(bookingObject, guest),
      );

      booking.commit();

      return booking;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
