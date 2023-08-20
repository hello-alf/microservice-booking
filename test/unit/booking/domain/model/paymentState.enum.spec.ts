import { PaymentState } from '../../../../../src/booking/domain/model/paymentState.enum';

describe('BookingState enum', () => {
  test('Verificar los valores del enum', () => {
    expect(PaymentState.PENDING).toBe('Pendiente');
    expect(PaymentState.COMPLETE).toBe('Completado');
    expect(PaymentState.NO_FUNDS).toBe('Sin fondos');
    expect(PaymentState.REVERTED).toBe('Revertido');
  });
});
