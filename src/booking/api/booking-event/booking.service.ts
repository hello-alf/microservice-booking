import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookingService {
  @RabbitSubscribe({
    exchange: 'demostracion',
    routingKey: '',
    queue: 'properties:booking',
  })
  public async pubSubHandler(msg: any) {
    console.log(`Received message: ${JSON.stringify(msg)}`);
  }
}
