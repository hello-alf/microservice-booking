import { CheckOutEvent } from '../../../../../src/booking/domain/events/checkOutEvent';

describe('CheckOutEvent', () => {
  it('Crear instancia', () => {
    const event = new CheckOutEvent('123');
    expect(event).toBeDefined();
  });

  it('Debe tener el ID correcto', () => {
    const id = '123';
    const event = new CheckOutEvent(id);
    expect(event.id).toBe(id);
  });
});
