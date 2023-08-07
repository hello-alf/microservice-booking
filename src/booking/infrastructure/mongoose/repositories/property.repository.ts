import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BookingModelSchema } from '../schemas/booking.schema';
import { iPropertyRepository } from '../../../domain/repositories/iProperty';

@Injectable()
export class PropertyRepository implements iPropertyRepository {
  constructor(
    @InjectModel(BookingModelSchema.name)
    private bookingModel: Model<BookingModelSchema>,
  ) {}

  save: (property: any) => Promise<void>;

  findById: (id: string) => Promise<any>;
}
