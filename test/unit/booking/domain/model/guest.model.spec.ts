import { Guest } from '../../../../../src/booking/domain/model/guest.model';

describe('Guest', () => {
  test('Crear objeto tipo Guest', () => {
    const guest: Guest = new Guest(
      '123',
      'Ana',
      'Lopez',
      'La Paz',
      'Bolivia',
      'ana@gmail.com',
    );
    expect(guest).toBeInstanceOf(Guest);
    expect(guest.getName()).toBe('Ana');
    expect(guest.getLastname()).toBe('Lopez');
    expect(guest.getCity()).toBe('La Paz');
    expect(guest.getCountry()).toBe('Bolivia');
    expect(guest.getEmail()).toBe('ana@gmail.com');
  });
});
