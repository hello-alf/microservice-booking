import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreatePropertyCommand } from '../impl/create-property.command';
import { PropertyRepository } from '../../../infrastructure/mongoose/repositories/property.repository';

@CommandHandler(CreatePropertyCommand)
export class CreatePropertyHandler
  implements ICommandHandler<CreatePropertyCommand>
{
  constructor(
    private readonly propertytRepository: PropertyRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreatePropertyCommand) {
    const { createPropertyRequest } = command;

    const property = this.publisher.mergeObjectContext(
      await this.propertytRepository.save(createPropertyRequest),
    );

    property.commit();

    return property;
  }
}
