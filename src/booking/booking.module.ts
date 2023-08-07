import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandHandlers } from './application/commands/handlers';
import { QueryHandlers } from './application/queries/handlers';
import { BookingController } from './api/booking/booking.controller';
import { BookingRepository } from './infrastructure/mongoose/repositories/booking.repository';
import {
  BookingModelSchema,
  BookingSchema,
} from './infrastructure/mongoose/schemas/booking.schema';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: BookingModelSchema.name,
        schema: BookingSchema,
      },
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingRepository, ...CommandHandlers, ...QueryHandlers],
})
export class BookingModule {}
