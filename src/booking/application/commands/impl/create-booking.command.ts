import { CreateBookingDto } from '../../dtos/booking.dto';

export class CreateBookingCommand {
  constructor(public readonly createBookingRequest: CreateBookingDto) {}
}
