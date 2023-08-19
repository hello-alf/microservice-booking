import { Currency } from '../../../../src/shared-kernel/valueObjects/currency';
import { PriceValue } from '../../../../src/shared-kernel/valueObjects/priceValue';

describe('PriceValue ValueObject', () => {
  let currency: Currency;

  beforeEach(() => {
    currency = new Currency('BOB');
  });

  test('PriceValue creacion de objeto', () => {
    const price: PriceValue = new PriceValue(10, currency);
    expect(price.getAmount()).toBe(10);
  });

  test('PriceValue withAmount', () => {
    let price: PriceValue = new PriceValue(10, currency);
    price = price.withAmount(5);
    expect(price.getAmount()).toBe(15);
  });

  test('PriceValue deductedWith', () => {
    let price: PriceValue = new PriceValue(10, currency);
    price = price.deductedWith(5);
    expect(price.getAmount()).toBe(5);
  });

  test('PriceValue igual a cero', () => {
    try {
      new PriceValue(0, currency);
      expect(true).toBeFalsy();
    } catch (error) {
      expect(() => {
        throw error;
      }).toThrowError('El costo debe ser mayor que cero.');
    }
  });

  test('PriceValue menor a cero', () => {
    try {
      new PriceValue(-10, currency);
      expect(true).toBeFalsy();
    } catch (error) {
      expect(() => {
        throw error;
      }).toThrowError('El costo debe ser mayor que cero.');
    }
  });
});
