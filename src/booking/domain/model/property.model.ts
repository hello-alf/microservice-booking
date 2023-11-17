import { AggregateRoot } from '@nestjs/cqrs';
import { PositiveValue } from '../../../shared-kernel/valueObjects/positiveValue';

export class Property extends AggregateRoot {
  private id: PositiveValue;
  private name: string;
  private address: string;
  private propertyType: string;
  private city: string;
  private pricePerNight: PositiveValue;

  constructor(
    id: number,
    name: string,
    address: string,
    propertyType: string,
    city: string,
    pricePerNight: number,
  ) {
    super();
    this.id = new PositiveValue(id);
    this.name = name;
    this.address = address;
    this.propertyType = propertyType;
    this.city = city;
    this.pricePerNight = new PositiveValue(pricePerNight);
  }

  public getId(): PositiveValue {
    return this.id;
  }

  public setId(value: PositiveValue) {
    this.id = value;
  }

  public getName(): string {
    return this.name;
  }

  public setName(value: string) {
    this.name = value;
  }

  public getAddress(): string {
    return this.address;
  }

  public setAddress(value: string) {
    this.address = value;
  }

  public setPropertyType(value: string) {
    this.propertyType = value;
  }

  public getPropertyType(): string {
    return this.propertyType;
  }

  public setCity(value: string) {
    this.city = value;
  }

  public getCity(): string {
    return this.city;
  }

  public getPricePerNight(): PositiveValue {
    return this.pricePerNight;
  }

  public setPricePerNight(value: PositiveValue) {
    this.pricePerNight = value;
  }
}
