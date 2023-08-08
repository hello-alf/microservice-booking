import { Body, Param, Controller, Post, Get } from '@nestjs/common';
import { CreateBookingDto } from '../../application/dtos/booking.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBookingCommand } from '../../application/commands/impl/create-booking.command';
import { CancelBookingCommand } from '../../application/commands/impl/cancel-booking.command';
import { GetBookingsQuery } from '../../application/queries/impl/get-bookings.query';

@Controller('booking')
export class BookingController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('/')
  findAll() {
    return this.queryBus.execute(new GetBookingsQuery());
  }

  @Post()
  create(@Body() payload: CreateBookingDto) {
    return this.commandBus.execute(new CreateBookingCommand(payload));
  }

  @Post(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.commandBus.execute(new CancelBookingCommand(id));
  }
}
