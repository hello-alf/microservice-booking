import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBookingQuery } from '../impl/get-booking.query';
import { BookingRepository } from '../../../infrastructure/mongoose/repositories/booking.repository';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetBookingQuery)
export class GetPropertyHandler implements IQueryHandler<GetBookingQuery> {
  constructor(private readonly repository: BookingRepository) {}

  async execute(query: GetBookingQuery) {
    try {
      return this.repository.findById(query.id);
    } catch (error) {
      throw new NotFoundException(`Booking with ID ${query.id} not found`);
    }
  }
}
