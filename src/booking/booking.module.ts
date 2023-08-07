import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingReadModel } from './infrastructure/mongoose/readModel/booking.readModel';
import { BookingController } from './api/booking/booking.controller';

@Module({
  imports: [CqrsModule],
  controllers: [BookingController],
  providers: [],
})
export class BookingModule {}
