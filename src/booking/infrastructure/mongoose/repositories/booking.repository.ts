import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { BookingModelSchema } from '../schemas/booking.schema';
import { iBookingRepository } from '../../../domain/repositories/iBooking';
import { Booking } from '../../../domain/model/booking.model';
import { BookingMapper } from '../mapper/booking.mapper';
import { GuestModelSchema } from '../schemas/guest.schema';
import { Guest } from 'src/booking/domain/model/guest.model';

@Injectable()
export class BookingRepository implements iBookingRepository {
  constructor(
    @InjectModel(BookingModelSchema.name)
    private readonly bookingModel: Model<BookingModelSchema>,
    @InjectModel(GuestModelSchema.name)
    private readonly guestModel: Model<GuestModelSchema>,
    private readonly bookingMapper: BookingMapper,
  ) {}

  save = (booking: Booking, guest: Guest): Booking => {
    const newGuest = new this.guestModel({
      _id: new ObjectId(guest.getId()),
      name: guest.getName(),
      lastname: guest.getLastname(),
      city: guest.getCity(),
      country: guest.getCountry(),
      email: guest.getEmail(),
    });

    const newBooking = new this.bookingModel({
      _id: new ObjectId(),
      propertyId: booking.getPropertyId(),
      numberOfGuests: booking.getNumberOfGuests(),
      numberOfDays: booking.getNumberOfDays(),
      costByNight: booking.getCostByNight(),
      totalCost: booking.getTotalCost().getAmount(),
      bookingState: booking.getBookingState(),
      paymentState: booking.getPaymentState(),
      registerDate: booking.getRegisterDate(),
      checkInDate: booking.getCheckInOut().getCheckInDate(),
      checkOutDate: booking.getCheckInOut().getCheckOutDate(),
      guest: newGuest,
      host: booking.getHost(),
    });

    newBooking.save();

    return this.bookingMapper.mapToDomain(newBooking, newGuest);
  };

  findAvailableBooking = (
    id: string,
    checkIn: Date,
    checkOut: Date,
  ): Promise<BookingModelSchema[]> => {
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

  findById = async (id: string): Promise<Booking> => {
    const objectId = new ObjectId(id);

    const booking = await this.bookingModel.findById(objectId).exec();

    const objectHostId = new ObjectId(booking.guest._id);
    const guest = await this.guestModel.findById(objectHostId).exec();

    return this.bookingMapper.mapToDomain(booking, guest);
  };

  findBookingMadeByGuest = async (
    id: string,
  ): Promise<BookingModelSchema[]> => {
    const objectGuestId = new ObjectId(id);

    const booking = await this.bookingModel
      .find({
        guest: objectGuestId,
      })
      .populate('guest')
      .exec();

    return booking;
  };

  findBookingMadeToHost = async (id: string): Promise<BookingModelSchema[]> => {
    const booking = await this.bookingModel
      .find({
        host: id,
      })
      .populate('guest')
      .exec();

    return booking;
  };

  findOneAndUpdate = async (id: string, payload: any): Promise<Booking> => {
    const objectId = new ObjectId(id);

    const booking = await this.bookingModel
      .findOneAndUpdate({ _id: objectId }, { $set: payload }, { new: true })
      .exec();

    const objectHostId = new ObjectId(booking.guest._id);
    const guest = await this.guestModel.findById(objectHostId).exec();

    return this.bookingMapper.mapToDomain(booking, guest);
  };

  findAll = (): Promise<BookingModelSchema[]> => {
    return this.bookingModel.find().populate('guest').exec();
  };
}
