import { Module } from '@nestjs/common';
import { BookingController } from './api/booking/booking.controller';

@Module({
  imports: [],
  controllers: [BookingController],
  providers: [],
  exports: [],
})
export class BookingModule {}
