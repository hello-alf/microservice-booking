import { CheckInEvent } from '../../../../../src/booking/domain/events/checkInEvent';

describe('CheckInEvent', () => {
  it('Crear instancia', () => {
    const event = new CheckInEvent('123');
    expect(event).toBeDefined();
  });

  it('Debe tener el ID correcto', () => {
    const id = '123';
    const event = new CheckInEvent(id);
    expect(event.id).toBe(id);
  });
});
