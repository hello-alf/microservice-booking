import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBookingsQuery } from '../impl/get-bookings.query';
import { BookingRepository } from '../../../infrastructure/mongoose/repositories/booking.repository';

@QueryHandler(GetBookingsQuery)
export class GetBookingsHandler implements IQueryHandler<GetBookingsQuery> {
  constructor(private readonly repository: BookingRepository) {}

  async execute(query: GetBookingsQuery) {
    return this.repository.findAll();
  }
}
