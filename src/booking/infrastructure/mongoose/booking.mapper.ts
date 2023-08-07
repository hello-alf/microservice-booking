import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Booking } from '../../domain/model/booking.model';
import { BookingModelSchema } from './schemas/booking.schema';

@Injectable()
export class BookingMapper {
  constructor(
    @InjectModel(BookingModelSchema.name)
    private bookingModel: Model<BookingModelSchema>,
  ) {}

  public mapToDomain(bookingDocumentSchema: BookingModelSchema): Booking {
    return new Booking(
      20,
      bookingDocumentSchema.numberOfGuests,
      bookingDocumentSchema.propertyId,
      '1232',
    );
  }

  public mapToEntity(bookingEntity: Booking): BookingModelSchema {
    const bookingschema = new this.bookingModel({
      propertyId: bookingEntity.getPropertyId(),
    });
    return bookingschema;
  }
}
