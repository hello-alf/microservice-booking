import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Property } from '../../../domain/model/property.model';
import { PropertyModelSchema } from '../schemas/property.schema';

@Injectable()
export class PropertyMapper {
  constructor(
    @InjectModel(PropertyModelSchema.name)
    private bookingModel: Model<PropertyModelSchema>,
  ) {}

  public mapToDomain(propertyDocumentSchema: PropertyModelSchema): Property {
    return new Property(
      propertyDocumentSchema.name,
      propertyDocumentSchema.pricePerNight,
    );
  }

  public mapToEntity(propertyEntity: Property): PropertyModelSchema {
    const propertySchema = new this.bookingModel({
      name: propertyEntity.getName(),
      pricePerNight: propertyEntity.getPricePerNight(),
    });
    return propertySchema;
  }
}
