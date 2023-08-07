import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingReadModel } from './infrastructure/mongoose/readModel/booking.readModel';
import { CommandHandlers } from './application/commands/handlers/index';
import { BookingController } from './api/booking/booking.controller';
import { BookingRepository } from './domain/repositories/BookingRepository';

@Module({
  imports: [CqrsModule],
  controllers: [BookingController],
  providers: [BookingRepository, ...CommandHandlers],
})
export class BookingModule {}
