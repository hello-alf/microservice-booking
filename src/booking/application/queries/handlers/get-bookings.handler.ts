import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBookingsQuery } from '../impl';
import { BookingRepository } from '../../../domain/repositories/bookingRepository';

@QueryHandler(GetBookingsQuery)
export class GetBookingsHandler implements IQueryHandler<GetBookingsQuery> {
  constructor(private readonly repository: BookingRepository) {}

  async execute(query: GetBookingsQuery) {
    return this.repository.findAll();
  }
}
