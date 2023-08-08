import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Booking } from '../../../domain/model/booking.model';
import { BookingModelSchema } from '../schemas/booking.schema';

@Injectable()
export class BookingMapper {
  constructor(
    @InjectModel(BookingModelSchema.name)
    private bookingModel: Model<BookingModelSchema>,
  ) {}

  public mapToDomain(bookingDocumentSchema: BookingModelSchema): Booking {
    const booking = new Booking(
      bookingDocumentSchema.costByNight,
      bookingDocumentSchema.numberOfGuests,
      bookingDocumentSchema.propertyId,
      '1232',
      bookingDocumentSchema.checkInDate,
      bookingDocumentSchema.checkOutDate,
    );

    if ('bookingState' in booking) {
      booking.setBookingState(bookingDocumentSchema.bookingState);
    }

    if ('paymentState' in booking) {
      booking.setPaymentState(bookingDocumentSchema.paymentState);
    }

    return booking;
  }

  public mapToEntity(bookingEntity: Booking): BookingModelSchema {
    const bookingschema = new this.bookingModel({
      propertyId: bookingEntity.getPropertyId(),
    });
    return bookingschema;
  }
}
