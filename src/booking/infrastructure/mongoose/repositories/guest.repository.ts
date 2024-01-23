import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { GuestModelSchema } from '../schemas/guest.schema';
import { iGuestRepository } from '../../../domain/repositories/iGuest';
import { GuestMapper } from '../mapper/guest.mapper';
import { Guest } from '../../../domain/model/guest.model';

@Injectable()
export class GuestRepository implements iGuestRepository {
  constructor(
    @InjectModel(GuestModelSchema.name)
    private readonly guestModel: Model<GuestModelSchema>,
    private readonly guestMapper: GuestMapper,
  ) {}

  save = (guest: Guest): Guest => {
    const newGuest = new this.guestModel({
      _id: new ObjectId(guest.getId()),
      name: guest.getName(),
      lastname: guest.getLastname(),
      city: guest.getCity(),
      country: guest.getCountry(),
      email: guest.getEmail(),
    });

    newGuest.save();

    return this.guestMapper.mapToDomain(newGuest);
  };

  findById = async (id: string): Promise<Guest> => {
    const objectId = new ObjectId(id);
    const actualGuest = await this.guestModel.findById(objectId).exec();

    return this.guestMapper.mapToDomain(actualGuest);
  };
}
