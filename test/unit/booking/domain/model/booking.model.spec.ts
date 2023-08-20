import { Booking } from '../../../../../src/booking/domain/model/booking.model';

describe('Booking', () => {
  test('Crear objeto tipo Booking', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const booking: Booking = new Booking(
      120,
      1,
      '123321-1',
      'guest_1',
      today,
      tomorrow,
    );

    expect(booking).toBeInstanceOf(Booking);
    expect(booking.getBookingState()).toBe('Pendiente');
    expect(booking.getPaymentState()).toBe('Pendiente');
  });

  test('Confirmar Reserva inicial', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const booking: Booking = new Booking(
      120,
      1,
      '123321-1',
      'guest_1',
      today,
      tomorrow,
    );

    booking.confirmBooking();

    expect(booking).toBeInstanceOf(Booking);
    expect(booking.getBookingState()).toBe('Confirmado');
    expect(booking.getPaymentState()).toBe('Pendiente');
  });

  test('Confirmar Reserva despues de cancelar', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const booking: Booking = new Booking(
      120,
      1,
      '123321-1',
      'guest_1',
      today,
      tomorrow,
    );

    booking.cancelBooking();

    try {
      booking.confirmBooking();
      expect(true).toBeFalsy();
    } catch (error) {
      expect(() => {
        throw error;
      }).toThrowError(
        'El estado inicial de la reserva es diferente a Pendiente',
      );
    }
  });

  test('Cancelar Reserva previamente cancelada', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const booking: Booking = new Booking(
      120,
      1,
      '123321-1',
      'guest_1',
      today,
      tomorrow,
    );

    booking.cancelBooking();

    try {
      booking.cancelBooking();
      expect(true).toBeFalsy();
    } catch (error) {
      expect(() => {
        throw error;
      }).toThrowError('El estado ya esta Cancelado');
    }
  });

  test('Pago completo Reserva inicial', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const booking: Booking = new Booking(
      120,
      1,
      '123321-1',
      'guest_1',
      today,
      tomorrow,
    );

    booking.completePayment();

    expect(booking).toBeInstanceOf(Booking);
    expect(booking.getBookingState()).toBe('Pendiente');
    expect(booking.getPaymentState()).toBe('Completado');
  });

  test('Pago completo Reserva cancelada', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const booking: Booking = new Booking(
      120,
      1,
      '123321-1',
      'guest_1',
      today,
      tomorrow,
    );

    booking.cancelBooking();

    try {
      booking.completePayment();
      expect(true).toBeFalsy();
    } catch (error) {
      expect(() => {
        throw error;
      }).toThrowError(
        'No se puedo completar el pago de una reserva completada',
      );
    }
  });

  test('Doble Pago', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const booking: Booking = new Booking(
      120,
      1,
      '123321-1',
      'guest_1',
      today,
      tomorrow,
    );

    booking.completePayment();

    try {
      booking.completePayment();
      expect(true).toBeFalsy();
    } catch (error) {
      expect(() => {
        throw error;
      }).toThrowError('El pago ya fue realizado previamente');
    }
  });

  test('Pago sin fondos Reserva inicial', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const booking: Booking = new Booking(
      120,
      1,
      '123321-1',
      'guest_1',
      today,
      tomorrow,
    );

    booking.noFundsPayment();

    expect(booking).toBeInstanceOf(Booking);
    expect(booking.getBookingState()).toBe('Pendiente');
    expect(booking.getPaymentState()).toBe('Sin fondos');
  });

  test('Pago sin fondos Reserva inicial', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const booking: Booking = new Booking(
      120,
      1,
      '123321-1',
      'guest_1',
      today,
      tomorrow,
    );

    booking.completePayment();

    try {
      booking.noFundsPayment();
      expect(true).toBeFalsy();
    } catch (error) {
      expect(() => {
        throw error;
      }).toThrowError('El pago no esta pendiente');
    }
  });

  test('Pago sin fondos Reserva inicial', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const booking: Booking = new Booking(
      120,
      1,
      '123321-1',
      'guest_1',
      today,
      tomorrow,
    );
    expect(booking).toBeInstanceOf(Booking);

    booking.completePayment();

    expect(booking.getBookingState()).toBe('Pendiente');
    expect(booking.getPaymentState()).toBe('Completado');
    booking.revertedPayment();
    expect(booking.getPaymentState()).toBe('Revertido');
  });

  test('Pago sin fondos Reserva inicial', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const booking: Booking = new Booking(
      120,
      1,
      '123321-1',
      'guest_1',
      today,
      tomorrow,
    );

    try {
      booking.revertedPayment();
      expect(true).toBeFalsy();
    } catch (error) {
      expect(() => {
        throw error;
      }).toThrowError('No se puede revertir el pago porque no se completo');
    }
  });

  test('Obtener numero de huespedes', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const booking: Booking = new Booking(
      120,
      1,
      '123321-1',
      'guest_1',
      today,
      tomorrow,
    );
    expect(booking).toBeInstanceOf(Booking);

    booking.addNumberOfGuests(3);
    expect(booking.getNumberOfGuests()).toBe(4);
  });

  test('Adicionar numero de huespedes igual a cero', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const booking: Booking = new Booking(
      120,
      1,
      '123321-1',
      'guest_1',
      today,
      tomorrow,
    );
    expect(booking).toBeInstanceOf(Booking);

    try {
      booking.addNumberOfGuests(0);
      expect(true).toBeFalsy();
    } catch (error) {
      expect(() => {
        throw error;
      }).toThrowError(
        'Los huespedes a adicionar deben ser mayores o iguales a uno',
      );
    }
  });

  test('Obtener ID de la propiedad', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const propertyId = '123321-1';

    const booking: Booking = new Booking(
      120,
      1,
      propertyId,
      'guest_1',
      today,
      tomorrow,
    );
    expect(booking).toBeInstanceOf(Booking);

    expect(booking.getPropertyId()).toBe(propertyId);
  });

  test('Obtener Costo por noche', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const propertyId = '123321-1';
    const costByNight = 120;

    const booking: Booking = new Booking(
      costByNight,
      1,
      propertyId,
      'guest_1',
      today,
      tomorrow,
    );
    expect(booking).toBeInstanceOf(Booking);

    expect(booking.getCostByNight()).toBe(costByNight);
  });

  test('Obtener Costo total por 1 noche', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const propertyId = '123321-1';
    const costByNight = 120;

    const booking: Booking = new Booking(
      costByNight,
      1,
      propertyId,
      'guest_1',
      today,
      tomorrow,
    );
    expect(booking).toBeInstanceOf(Booking);

    expect(booking.getTotalCost().getAmount()).toBe(costByNight);
  });

  test('Obtener Número de dias', () => {
    const today = new Date();
    const toFourDays = new Date();
    toFourDays.setDate(today.getDate() + 4);

    const propertyId = '123321-1';
    const costByNight = 120;

    const booking: Booking = new Booking(
      costByNight,
      1,
      propertyId,
      'guest_1',
      today,
      toFourDays,
    );
    expect(booking).toBeInstanceOf(Booking);

    expect(booking.getNumberOfDays()).toBe(4);
  });

  test('Obtener información de checkin y checkout', () => {
    const today = new Date();
    const toFourDays = new Date();
    toFourDays.setDate(today.getDate() + 4);

    const propertyId = '123321-1';
    const costByNight = 120;

    const booking: Booking = new Booking(
      costByNight,
      1,
      propertyId,
      'guest_1',
      today,
      toFourDays,
    );
    expect(booking).toBeInstanceOf(Booking);

    expect(booking.getCheckInOut().getCheckInDate()).toBe(today);
    expect(booking.getCheckInOut().getCheckOutDate()).toBe(toFourDays);
  });

  test('Obtener fecha de registro', () => {
    const today = new Date();
    const toFourDays = new Date();
    toFourDays.setDate(today.getDate() + 4);

    const propertyId = '123321-1';
    const costByNight = 120;

    const booking: Booking = new Booking(
      costByNight,
      1,
      propertyId,
      'guest_1',
      today,
      toFourDays,
    );
    expect(booking).toBeInstanceOf(Booking);

    expect(booking.getRegisterDate()).toBeDefined();
  });

  test('Setear estado de reserva', () => {
    const today = new Date();
    const toFourDays = new Date();
    toFourDays.setDate(today.getDate() + 4);

    const propertyId = '123321-1';
    const costByNight = 120;

    const booking: Booking = new Booking(
      costByNight,
      1,
      propertyId,
      'guest_1',
      today,
      toFourDays,
    );

    booking.setBookingState('CANCELADO');
    expect(booking).toBeInstanceOf(Booking);

    expect(booking.getBookingState()).toBe('CANCELADO');
  });

  test('Setear estado de reserva', () => {
    const today = new Date();
    const toFourDays = new Date();
    toFourDays.setDate(today.getDate() + 4);

    const propertyId = '123321-1';
    const costByNight = 120;

    const booking: Booking = new Booking(
      costByNight,
      1,
      propertyId,
      'guest_1',
      today,
      toFourDays,
    );

    booking.setPaymentState('PAGADO');
    expect(booking).toBeInstanceOf(Booking);

    expect(booking.getPaymentState()).toBe('PAGADO');
  });
});
