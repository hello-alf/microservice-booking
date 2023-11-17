import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';

import { CreatePropertyCommand } from '../impl/create-property.command';
import { PropertyRepository } from '../../../infrastructure/mongoose/repositories/property.repository';
import { PropertyFactory } from '../../../domain/factories/property.factory';

@CommandHandler(CreatePropertyCommand)
export class CreatePropertyHandler
  implements ICommandHandler<CreatePropertyCommand>
{
  constructor(
    private readonly propertyRepository: PropertyRepository,
    private readonly publisher: EventPublisher,
    private readonly propertyFactory: PropertyFactory,
  ) {}

  async execute(command: CreatePropertyCommand) {
    try {
      const { createPropertyRequest } = command;
      const propertyObject = this.propertyFactory.createProperty(
        createPropertyRequest.id,
        createPropertyRequest.name,
        createPropertyRequest.address,
        createPropertyRequest.propertyType,
        createPropertyRequest.city,
        createPropertyRequest.pricePerNight,
      );

      const property = this.publisher.mergeObjectContext(
        this.propertyRepository.save(propertyObject),
      );

      property.commit();

      return property;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
