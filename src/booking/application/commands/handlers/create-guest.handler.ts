import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';

import { CreateGuestCommand } from '../impl/create-guest.command';
import { GuestRepository } from '../../../infrastructure/mongoose/repositories/guest.repository';
import { GuestFactory } from '../../../domain/factories/guest.factory';

@CommandHandler(CreateGuestCommand)
export class CreateGuestHandler implements ICommandHandler<CreateGuestCommand> {
  constructor(
    private readonly guestRepository: GuestRepository,
    private readonly publisher: EventPublisher,
    private readonly guestFactory: GuestFactory,
  ) {}

  async execute(command: CreateGuestCommand) {
    try {
      const { createGuestRequest } = command;
      const hostObject = this.guestFactory.createGuest(
        createGuestRequest._id,
        createGuestRequest.name,
        createGuestRequest.lastname,
        createGuestRequest.city,
        createGuestRequest.country,
        createGuestRequest.email,
      );

      const host = this.publisher.mergeObjectContext(
        this.guestRepository.save(hostObject),
      );

      host.commit();

      return host;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
