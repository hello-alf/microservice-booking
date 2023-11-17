import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePropertyCommand } from 'src/booking/application/commands/impl/create-property.command';
import { CreatePropertyDto } from 'src/booking/application/dtos/property.dto';

@Injectable()
export class PropertyService {
  constructor(private readonly commandBus: CommandBus) {}

  @RabbitSubscribe({
    exchange: 'demostracion',
    routingKey: '',
    queue: 'properties:booking',
  })
  public async pubSubHandler(msg: any) {
    console.log(msg);
    console.log(msg.id);

    const createPropertyDto: CreatePropertyDto = {
      id: msg.id,
      name: msg.descripcion,
      address: msg.direccion,
      propertyType: msg.tipo_propiedad,
      city: msg.ciudad,
      pricePerNight: 150,
    };

    await this.commandBus.execute(new CreatePropertyCommand(createPropertyDto));
  }
}
