import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateBookingCommand } from '../impl/create-booking.command';
import { BookingRepository } from '../../../domain/repositories/BookingRepository';

@CommandHandler(CreateBookingCommand)
export class CreateBookingHandler
  implements ICommandHandler<CreateBookingCommand>
{
  constructor(
    private readonly repository: BookingRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateBookingCommand) {
    console.log('command', command);
    return { hola: 'mundo' };
    // const { heroId, itemId } = command;
    // const hero = this.publisher.mergeObjectContext(
    //   await this.repository.findOneById(+heroId),
    // );
    // hero.addItem(itemId);
    // hero.commit();
  }
}
