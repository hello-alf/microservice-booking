import { PositiveValue } from '../../../../src/shared-kernel/valueObjects/positiveValue';

describe('PositiveValue ValueObject', () => {
  test('PositiveValue creacion de objeto', () => {
    const price: PositiveValue = new PositiveValue(10);
    expect(price.getValue()).toBe(10);
  });

  test('PositiveValue igual a cero', () => {
    try {
      new PositiveValue(0);
    } catch (error) {
      expect(() => {
        throw error;
      }).toThrowError('El costo debe ser mayor que cero.');
    }
  });

  test('PositiveValue menor a cero', () => {
    try {
      new PositiveValue(-100);
    } catch (error) {
      expect(() => {
        throw error;
      }).toThrowError('El costo debe ser mayor que cero.');
    }
  });
});
