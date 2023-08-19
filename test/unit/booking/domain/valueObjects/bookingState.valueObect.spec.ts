import { BookingState } from '../../../../../src/booking/domain/valueObjects/bookingState.valueObject';

describe('BookingState ValueObject', () => {
  test('BookingState creacion de objeto', () => {
    const booking: BookingState = new BookingState('PENDIENTE');
    expect(booking.getState()).toBe('PENDIENTE');
  });

  test('BookingState creacion de objeto', () => {
    const booking: BookingState = new BookingState('PENDIENTE');
    expect(booking.getState()).not.toBe('APROBADO');
  });
});
