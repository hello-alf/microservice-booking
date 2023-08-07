import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { BookingController } from './api/booking/booking.controller';
import { PropertyController } from './api/property/property.controller';
import { CommandHandlers } from './application/commands/handlers';
import { QueryHandlers } from './application/queries/handlers';
import { BookingRepository } from './infrastructure/mongoose/repositories/booking.repository';
import { PropertyRepository } from './infrastructure/mongoose/repositories/property.repository';
import {
  BookingModelSchema,
  BookingSchema,
} from './infrastructure/mongoose/schemas/booking.schema';
import {
  PropertyModelSchema,
  PropertySchema,
} from './infrastructure/mongoose/schemas/property.schema';
import { PropertyMapper } from './infrastructure/mongoose/mapper/property.mapper';

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
  ],
  controllers: [BookingController, PropertyController],
  providers: [
    BookingRepository,
    PropertyRepository,
    ...CommandHandlers,
    ...QueryHandlers,
    PropertyMapper,
  ],
})
export class BookingModule {}
