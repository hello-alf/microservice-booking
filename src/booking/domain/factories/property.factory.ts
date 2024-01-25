import { Injectable } from '@nestjs/common';
import { iProperty } from './iProperty';
import { Property } from '../model/property.model';

@Injectable()
export class PropertyFactory implements iProperty {
  createProperty(
    id: string,
    name: string,
    address: string,
    propertyType: string,
    city: string,
    pricePerNight: number,
    host: string,
  ) {
    return new Property(
      id,
      name,
      address,
      propertyType,
      city,
      pricePerNight,
      host,
    );
  }
}
