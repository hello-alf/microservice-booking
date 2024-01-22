import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { BookingController } from './api/booking/booking.controller';
import { PropertyController } from './api/property/property.controller';
import { PropertyService } from './api/property-event/property.service';
import { Repositories } from './infrastructure/mongoose/repositories';
import {
  BookingModelSchema,
  BookingSchema,
} from './infrastructure/mongoose/schemas/booking.schema';
import {
  PropertyModelSchema,
  PropertySchema,
} from './infrastructure/mongoose/schemas/property.schema';
import { Mapper } from './infrastructure/mongoose/mapper';
import { CommandHandlers } from './application/commands/handlers';
import { QueryHandlers } from './application/queries/handlers';
import { Factories } from './domain/factories';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: BookingModelSchema.name,
        schema: BookingSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: PropertyModelSchema.name,
        schema: PropertySchema,
      },
    ]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'property-service:property-created',
          type: 'fanout',
        },
        {
          name: 'booking-service',
          type: 'fanout',
        },
      ],
      uri: 'amqp://3.131.89.227:5672',
      connectionInitOptions: { wait: true, reject: true, timeout: 3000 },
    }),
  ],
  controllers: [BookingController, PropertyController],
  providers: [
    ...Repositories,
    ...CommandHandlers,
    ...QueryHandlers,
    ...Mapper,
    ...Factories,
    PropertyService,
  ],
})
export class BookingModule {}
