import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTripsQuery } from '../impl/get-trips.query';
import { BookingRepository } from '../../../infrastructure/mongoose/repositories/booking.repository';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetTripsQuery)
export class GetTripsHandler implements IQueryHandler<GetTripsQuery> {
  constructor(private readonly repository: BookingRepository) {}

  async execute(query: GetTripsQuery) {
    try {
      return this.repository.findBookingMadeByGuest(query.id);
    } catch (error) {
      throw new NotFoundException(`Booking with ID ${query.id} not found`);
    }
  }
}
