import { Injectable } from '@nestjs/common';
import { iGuest } from './iGuest';
import { Guest } from '../model/guest.model';

@Injectable()
export class GuestFactory implements iGuest {
  createGuest(
    _id: string,
    name: string,
    lastname: string,
    city: string,
    country: string,
    email: string,
  ) {
    return new Guest(_id, name, lastname, city, country, email);
  }
}
