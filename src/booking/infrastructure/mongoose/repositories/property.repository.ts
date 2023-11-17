import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { PropertyModelSchema } from '../schemas/property.schema';
import { iPropertyRepository } from '../../../domain/repositories/iProperty';
import { Property } from '../../../domain/model/property.model';
import { PropertyMapper } from '../mapper/property.mapper';

@Injectable()
export class PropertyRepository implements iPropertyRepository {
  constructor(
    @InjectModel(PropertyModelSchema.name)
    private readonly propertyModel: Model<PropertyModelSchema>,
    private readonly propertyMapper: PropertyMapper,
  ) {}

  save = (property: Property): Property => {
    const newProperty = new this.propertyModel({
      _id: new ObjectId(),
      id: property.getId().getValue(),
      name: property.getName(),
      address: property.getAddress(),
      propertyType: property.getPropertyType(),
      city: property.getCity(),
      pricePerNight: property.getPricePerNight().getValue(),
    });

    newProperty.save();

    return this.propertyMapper.mapToDomain(newProperty);
  };

  findById = (id: string): Promise<PropertyModelSchema> => {
    const objectId = new ObjectId(id);
    return this.propertyModel.findById(objectId).exec();
  };

  findAll = (): Promise<PropertyModelSchema[]> => {
    return this.propertyModel.find().exec();
  };
}
