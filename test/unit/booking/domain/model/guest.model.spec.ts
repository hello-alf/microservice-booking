import { Guest } from '../../../../../src/booking/domain/model/guest.model';

describe('Guest', () => {
  test('Crear objeto tipo Guest', () => {
    const guest: Guest = new Guest('Ana Lopez');

    expect(guest).toBeInstanceOf(Guest);
    expect(guest.getName()).toBe('Ana Lopez');
  });
});
