import { AggregateRoot } from '@nestjs/cqrs';

export class Guest extends AggregateRoot {
  private _id: string;
  private name: string;
  private lastname: string;
  private city: string;
  private country: string;
  private email: string;

  constructor(
    _id: string,
    name: string,
    lastname: string,
    city: string,
    country: string,
    email: string,
  ) {
    super();
    this._id = _id;
    this.name = name;
    this.lastname = lastname;
    this.city = city;
    this.country = country;
    this.email = email;
  }

  public getId(): string {
    return this._id;
  }

  public setId(value: string) {
    this._id = value;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string) {
    this.name = value;
  }

  public getLastname(): string {
    return this.lastname;
  }

  public setLastname(value: string) {
    this.lastname = value;
  }

  public getCity(): string {
    return this.city;
  }

  public setCity(value: string) {
    this.city = value;
  }

  public getCountry(): string {
    return this.country;
  }

  public setCountry(value: string) {
    this.country = value;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(value: string) {
    this.email = value;
  }
}
