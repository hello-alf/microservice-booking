import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Booking } from '../../../domain/model/booking.model';
import { BookingModelSchema } from '../schemas/booking.schema';
import { Guest } from 'src/booking/domain/model/guest.model';
import { GuestModelSchema } from '../schemas/guest.schema';

@Injectable()
export class BookingMapper {
  constructor(
    @InjectModel(BookingModelSchema.name)
    private bookingModel: Model<BookingModelSchema>,
  ) {}

  public mapToDomain(
    bookingDocumentSchema: BookingModelSchema,
    guestDocumentSchema: GuestModelSchema,
  ): Booking {
    const actualGuest = new Guest(
      guestDocumentSchema._id.toString(),
      guestDocumentSchema.name,
      guestDocumentSchema.lastname,
      guestDocumentSchema.city,
      guestDocumentSchema.country,
      guestDocumentSchema.email,
    );

    const booking = new Booking(
      bookingDocumentSchema._id.toString(),
      bookingDocumentSchema.costByNight,
      bookingDocumentSchema.numberOfGuests,
      bookingDocumentSchema.propertyId,
      actualGuest,
      bookingDocumentSchema.checkInDate,
      bookingDocumentSchema.checkOutDate,
      bookingDocumentSchema.host,
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
