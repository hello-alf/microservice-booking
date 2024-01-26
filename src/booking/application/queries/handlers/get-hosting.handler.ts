import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { GetHostingQuery } from '../impl/get-hosting.query';
import { BookingRepository } from '../../../infrastructure/mongoose/repositories/booking.repository';

@QueryHandler(GetHostingQuery)
export class GetHostingHandler implements IQueryHandler<GetHostingQuery> {
  constructor(private readonly repository: BookingRepository) {}

  async execute(query: GetHostingQuery) {
    try {
      const response = await this.repository.findBookingMadeToHost(query.id);
      return response;
    } catch (error) {
      throw new NotFoundException(`Booking with ID ${query.id} not found`);
    }
  }
}
