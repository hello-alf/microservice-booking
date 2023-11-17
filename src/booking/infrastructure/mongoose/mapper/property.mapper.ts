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
      propertyDocumentSchema.id,
      propertyDocumentSchema.name,
      propertyDocumentSchema.address,
      propertyDocumentSchema.propertyType,
      propertyDocumentSchema.city,
      propertyDocumentSchema.pricePerNight,
    );
  }

  public mapToEntity(propertyEntity: Property): PropertyModelSchema {
    const propertySchema = new this.bookingModel({
      id: propertyEntity.getId(),
      name: propertyEntity.getName(),
      address: propertyEntity.getAddress(),
      propertyType: propertyEntity.getPropertyType(),
      city: propertyEntity.getCity(),
      pricePerNight: propertyEntity.getPricePerNight(),
    });
    return propertySchema;
  }
}
