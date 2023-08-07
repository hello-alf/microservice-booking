import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { PropertyModelSchema } from '../schemas/property.schema';
import { iPropertyRepository } from '../../../domain/repositories/iProperty';
import { Property } from 'src/booking/domain/model/property.model';
import { PropertyMapper } from '../mapper/property.mapper';

@Injectable()
export class PropertyRepository implements iPropertyRepository {
  constructor(
    @InjectModel(PropertyModelSchema.name)
    private readonly propertyModel: Model<PropertyModelSchema>,
    private readonly propertyMapper: PropertyMapper,
  ) {}

  save = (property: any): Property => {
    const newProperty = new this.propertyModel({
      _id: new ObjectId(),
      ...property,
    });
    newProperty.save();
    return this.propertyMapper.mapToDomain(newProperty);
  };

  findById = (id: string): Promise<PropertyModelSchema> => {
    return this.propertyModel.findById(id).exec();
  };
}
