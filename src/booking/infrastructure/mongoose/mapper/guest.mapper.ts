import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Guest } from '../../../domain/model/guest.model';
import { GuestModelSchema } from '../schemas/guest.schema';

@Injectable()
export class GuestMapper {
  constructor(
    @InjectModel(GuestModelSchema.name)
    private guestModel: Model<GuestModelSchema>,
  ) {}

  public mapToDomain(guestDocumentSchema: GuestModelSchema): Guest {
    return new Guest(
      guestDocumentSchema._id.toString(),
      guestDocumentSchema.name,
      guestDocumentSchema.lastname,
      guestDocumentSchema.city,
      guestDocumentSchema.country,
      guestDocumentSchema.email,
    );
  }
}
