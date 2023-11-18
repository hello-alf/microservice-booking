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

console.log('process.env.RABBITMQ_URI', process.env.RABBITMQ_URI);

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
          name: 'demostracion',
          type: 'fanout',
        },
        {
          name: 'booking-service',
          type: 'fanout',
        },
      ],
      uri:
        process.env.RABBITMQ_URI ||
        'amqps://farhdenj:BilLhsNpcQHME1p2ItwtM5sZImZaqmDC@shrimp.rmq.cloudamqp.com/farhdenj',
      connectionInitOptions: { timeout: 60000 },
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
