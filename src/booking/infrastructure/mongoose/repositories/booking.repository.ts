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
      propertyId: booking.getPropertyId(),
      numberOfGuests: booking.getNumberOfGuests(),
      costByNight: booking.getCostByNight(),
      totalCost: booking.getTotalCost().getAmount(),
      bookingState: booking.getBookingState(),
      paymentState: booking.getPaymentState(),
      registerDate: booking.getRegisterDate(),
      checkInDate: booking.getCheckInDate(),
      checkOutDate: booking.getCheckOutDate(),
    });

    newBooking.save();

    return this.bookingMapper.mapToDomain(newBooking);
  };

  findAvailableBooking = (
    id: string,
    checkIn: Date,
    checkOut: Date,
  ): Promise<BookingModelSchema[]> => {
    console.log('checkIn', checkIn);
    console.log('checkOut', checkOut);

    return this.bookingModel.find({
      propertyId: id,
      $or: [
        {
          checkInDate: { $gte: new Date(checkIn), $lt: new Date(checkOut) },
        },
        {
          checkOutDate: { $gt: new Date(checkIn), $lte: new Date(checkOut) },
        },
      ],
    });
  };

  findById: (id: string) => Promise<BookingModelSchema | null>;

  findAll = (): Promise<BookingModelSchema[]> => {
    return this.bookingModel.find().exec();
  };
}
