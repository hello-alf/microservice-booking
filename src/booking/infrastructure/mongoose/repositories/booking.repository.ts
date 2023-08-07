import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BookingModelSchema } from '../schemas/booking.schema';
import { iBookingRepository } from '../../../domain/repositories/bookingRepository';

@Injectable()
export class BookingRepository implements iBookingRepository {
  constructor(
    @InjectModel(BookingModelSchema.name)
    private bookingModel: Model<BookingModelSchema>,
  ) {}

  newId: () => Promise<string>;

  save: (booking: BookingModelSchema) => Promise<void>;

  findById: (id: string) => Promise<BookingModelSchema | null>;

  public findAll = (): Promise<BookingModelSchema[]> =>
    this.bookingModel.find().exec();
}
