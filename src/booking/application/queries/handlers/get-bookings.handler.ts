import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { GetBookingsQuery } from '../impl/get-bookings.query';
import { BookingRepository } from '../../../infrastructure/mongoose/repositories/booking.repository';

@QueryHandler(GetBookingsQuery)
export class GetBookingsHandler implements IQueryHandler<GetBookingsQuery> {
  constructor(private readonly repository: BookingRepository) {}

  async execute(query: GetBookingsQuery) {
    try {
      const response = await this.repository.findAll();
      return response;
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
