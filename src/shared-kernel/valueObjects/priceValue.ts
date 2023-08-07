import { ValueObject } from '../core/valueObject';
import { Currency } from './currency';

export class PriceValue extends ValueObject {
  private amount: number;
  private currency: Currency;

  constructor(amount: number, currency: Currency) {
    super();

    if (amount <= 0) {
      throw new Error('El costo debe ser mayor que cero.');
    }

    this.amount = amount;
    this.currency = currency;
  }

  public withAmount(amount: number): PriceValue {
    return new PriceValue(this.amount + amount, this.currency);
  }

  public deductedWith(amount: number): PriceValue {
    return new PriceValue(this.amount - amount, this.currency);
  }

  public getAmount(): number {
    return this.amount;
  }
}
