import { ValueObject } from '../../../shared-kernel/core/valueObject';

export class Check extends ValueObject {
  private checkIn: number;
  private checkOut: number;
  private checkInDate: Date;
  private checkOutDate: Date;
  private numberOfDays: number;

  constructor(checkIn: Date, checkOut: Date) {
    super();

    if (checkOut <= checkIn) {
      throw new Error(
        'La fecha de salida debe ser mayor a la fecha de ingreso.',
      );
    }

    this.checkInDate = checkIn;
    this.checkOutDate = checkOut;

    const checkInDateWithoutTime = new Date(checkIn);
    this.checkIn = checkInDateWithoutTime.setUTCHours(0, 0, 0, 0);

    const checkOutDateWithoutTime = new Date(checkOut);
    checkOutDateWithoutTime.setUTCHours(0, 0, 0, 0);

    const timeDifference =
      checkOutDateWithoutTime.getTime() - checkInDateWithoutTime.getTime();

    this.numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (this.numberOfDays <= 0) {
      throw new Error('El número de días de estadía debe ser mayor a cero');
    }
  }

  public getCheckInDate(): Date {
    return this.checkInDate;
  }

  public getCheckOutDate(): Date {
    return this.checkOutDate;
  }

  public getNumberOfDays(): number {
    return this.numberOfDays;
  }
}
