import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateBookingDto } from '../../application/dtos/booking.dto';

@Controller('booking')
export class BookingController {
  constructor() {}

  @Get('/')
  findAll() {
    return [];
  }

  @Post()
  create(@Body() payload: CreateBookingDto) {
    return { hola: 'mundo' };
  }
}
