import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateBookingCommand } from '../impl/create-booking.command';
import { BookingRepository } from '../../../infrastructure/mongoose/repositories/booking.repository';
import { PropertyRepository } from '../../../infrastructure/mongoose/repositories/property.repository';
import { BookingError } from '../../../domain/errors/bookingError';

@CommandHandler(CreateBookingCommand)
export class CreateBookingHandler
  implements ICommandHandler<CreateBookingCommand>
{
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly propertytRepository: PropertyRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateBookingCommand) {
    const { createBookingRequest } = command;
    console.log('createBookingRequest', createBookingRequest);

    const property = await this.propertytRepository.findById(
      createBookingRequest.propertyId,
    );

    if (!property) throw new NotFoundException(BookingError.PROPERTY_NOT_FOUND);

    return { hola: 'mundo' };

    // const hero = this.publisher.mergeObjectContext(
    //   await this.repository.findOneById(+heroId),
    // );
    // hero.addItem(itemId);
    // hero.commit();
  }
}
