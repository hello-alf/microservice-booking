import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ClientProxyNURBNB {
  constructor(private readonly config: ConfigService) {}

  clientProxyCustomers(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: { urls: ['amqp://rabbitmq'], queue: 'customers' },
    });
  }

  clientProxyProperties(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: { urls: ['amqp://rabbitmq'], queue: 'properties' },
    });
  }
}
