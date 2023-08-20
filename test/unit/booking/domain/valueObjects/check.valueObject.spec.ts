import { Check } from '../../../../../src/booking/domain/valueObjects/check.valueObject';

describe('Check ValueObject', () => {
  test('Validacion de 1 dia a partir de hoy', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const checkDates: Check = new Check(today, tomorrow);

    expect(checkDates.getNumberOfDays()).toBe(1);
  });

  test('Validacion de 1 dia a partir de ayer', () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const checkDates: Check = new Check(yesterday, today);

    expect(checkDates.getNumberOfDays()).toBe(1);
  });

  test('Validacion de 2 dias a partir de ayer', () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const checkDates: Check = new Check(yesterday, tomorrow);

    expect(checkDates.getNumberOfDays()).toBe(2);
  });

  test('Fecha checkout mayor', () => {
    try {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      const checkDates: Check = new Check(yesterday, tomorrow);

      expect(checkDates.getNumberOfDays()).toBe(2);
    } catch (error) {
      expect(() => {
        throw error;
      }).toThrowError(
        'La fecha de salida debe ser mayor a la fecha de ingreso.',
      );
    }
  });

  test('Fecha checkout igual a fecha checkin', () => {
    try {
      const today = new Date();

      const checkDates: Check = new Check(today, today);

      expect(checkDates.getNumberOfDays()).toBe(0);
    } catch (error) {
      expect(() => {
        throw error;
      }).toThrowError(
        'La fecha de salida debe ser mayor a la fecha de ingreso.',
      );
    }
  });

  test('Verificar fecha checkin', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const checkDates: Check = new Check(today, tomorrow);

    expect(checkDates.getCheckInDate()).toBe(today);
  });

  test('Verificar fecha checkout', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const checkDates: Check = new Check(today, tomorrow);

    expect(checkDates.getCheckOutDate()).toBe(tomorrow);
  });
});
