import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateGuestCommand } from '../../application/commands/impl/create-guest.command';
import { CreateGuestDto } from '../../application/dtos/guest.dto';

@Injectable()
export class GuestService {
  constructor(private readonly commandBus: CommandBus) {}

  @RabbitSubscribe({
    exchange: 'user-service:guest-created',
    routingKey: '',
    queue: 'booking:guest',
  })
  public async pubSubHandler(msg: any) {
    console.log(msg);
    console.log(msg.id);

    const createGuestDto: CreateGuestDto = {
      _id: msg._id,
      name: msg.name,
      lastname: msg.lastname,
      country: msg.country,
      city: msg.city,
      email: msg.email,
    };

    await this.commandBus.execute(new CreateGuestCommand(createGuestDto));
  }
}
