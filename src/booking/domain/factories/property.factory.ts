import { Injectable } from '@nestjs/common';
import { iProperty } from './iProperty';
import { Property } from '../model/property.model';

@Injectable()
export class PropertyFactory implements iProperty {
  createProperty(
    id: number,
    name: string,
    address: string,
    propertyType: string,
    city: string,
    pricePerNight: number,
  ) {
    return new Property(id, name, address, propertyType, city, pricePerNight);
  }
}
