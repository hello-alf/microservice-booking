import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PropertyModelSchema } from '../schemas/property.schema';
import { iPropertyRepository } from '../../../domain/repositories/iProperty';

@Injectable()
export class PropertyRepository implements iPropertyRepository {
  constructor(
    @InjectModel(PropertyModelSchema.name)
    private propertyModel: Model<PropertyModelSchema>,
  ) {}

  save: (property: any) => Promise<void>;

  findById = (id: string): Promise<PropertyModelSchema> => {
    return this.propertyModel.findById(id).exec();
  };
}
