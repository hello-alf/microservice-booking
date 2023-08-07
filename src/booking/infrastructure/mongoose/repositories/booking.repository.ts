import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { BookingModelSchema } from '../schemas/booking.schema';
import { iBookingRepository } from '../../../domain/repositories/iBooking';
import { Booking } from '../../../domain/model/booking.model';
import { BookingMapper } from '../mapper/booking.mapper';

@Injectable()
export class BookingRepository implements iBookingRepository {
  constructor(
    @InjectModel(BookingModelSchema.name)
    private readonly bookingModel: Model<BookingModelSchema>,
    private readonly bookingMapper: BookingMapper,
  ) {}

  save = (booking: Booking): Booking => {
    const newBooking = new this.bookingModel({
      _id: new ObjectId(),
      numberOfGuests: booking.getNumberOfGuests(),
      // pricePerNight: booking,
    });

    newBooking.save();

    return this.bookingMapper.mapToDomain(newBooking);
  };

  findById: (id: string) => Promise<BookingModelSchema | null>;

  findAll = (): Promise<BookingModelSchema[]> => {
    return this.bookingModel.find().exec();
  };
}
