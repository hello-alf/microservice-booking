import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateBookingDto } from '../../application/dtos/booking.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBookingCommand } from '../../application/commands/impl/create-booking.command';

@Controller('booking')
export class BookingController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('/')
  findAll() {
    return [];
  }

  @Post()
  create(@Body() payload: CreateBookingDto) {
    console.log('Por Create');
    return this.commandBus.execute(new CreateBookingCommand(payload));
  }
}
