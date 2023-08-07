import { Injectable } from '@nestjs/common';
import { iProperty } from './iProperty';
import { Property } from '../model/property.model';

@Injectable()
export class PropertyFactory implements iProperty {
  createProperty(name: string, pricePerNight: number) {
    return new Property(name, pricePerNight);
  }
}
