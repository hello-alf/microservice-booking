import { BookingError } from '../../../../../src/booking/domain/errors/bookingError';

describe('BookingError enum', () => {
  it('should have the expected enum values', () => {
    expect(BookingError.BOOKING_NOT_FOUND).toBe('Reserva no encontrada');
    expect(BookingError.BUSY_BOOKING).toBe('Reserva ocupada');
    expect(BookingError.PROPERTY_NOT_FOUND).toBe('Propiedad no encontrada');
  });
});
