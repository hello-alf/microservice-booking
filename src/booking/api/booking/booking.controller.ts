import { Body, Param, Controller, Post, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreateBookingDto } from '../../application/dtos/booking.dto';
import { CreateBookingCommand } from '../../application/commands/impl/create-booking.command';
import { ConfirmBookingCommand } from '../../application/commands/impl/confirm-booking.command';
import { CancelBookingCommand } from '../../application/commands/impl/cancel-booking.command';
import { CompleteBookingPaymentCommand } from '../../application/commands/impl/complete-booking-payment.command';
import { GetBookingsQuery } from '../../application/queries/impl/get-bookings.query';
import { GetBookingQuery } from '../../application/queries/impl/get-booking.query';
import { GetTripsQuery } from '../../application/queries/impl/get-trips.query';
import { GetHostingQuery } from '../../application/queries/impl/get-hosting.query';

@ApiTags('booking')
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

  @Get('/trips/:id')
  findTrips(@Param('id') id: string) {
    return this.queryBus.execute(new GetTripsQuery(id));
  }

  @Get('/hosting/:id')
  findHosting(@Param('id') id: string) {
    return this.queryBus.execute(new GetHostingQuery(id));
  }

  @Post()
  create(@Body() payload: CreateBookingDto) {
    return this.commandBus.execute(new CreateBookingCommand(payload));
  }

  @Post(':id/confirm')
  confirm(@Param('id') id: string) {
    return this.commandBus.execute(new ConfirmBookingCommand(id));
  }

  @Post(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.commandBus.execute(new CancelBookingCommand(id));
  }

  @Post(':id/payment/complete')
  completePayment(@Param('id') id: string) {
    return this.commandBus.execute(new CompleteBookingPaymentCommand(id));
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetBookingQuery(id));
  }
}
