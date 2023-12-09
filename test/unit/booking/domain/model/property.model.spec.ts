import { Property } from '../../../../../src/booking/domain/model/property.model';
import { PositiveValue } from '../../../../../src/shared-kernel/valueObjects/positiveValue';

describe('Property', () => {
  test('Crear objeto tipo Property', () => {
    const property: Property = new Property(
      2,
      'Departamento en Sopocachi',
      'CAlle 123',
      'Departamento',
      'La Paz',
      95,
    );

    expect(property).toBeInstanceOf(Property);
    expect(property.getName()).toBe('Departamento en Sopocachi');
    expect(property.getPricePerNight().getValue()).toBe(95);
  });

  test('Actualizar Nombre Property', () => {
    const property: Property = new Property(
      3,
      'Casa en Miraflores',
      'CAlle ABC',
      'Departamento',
      'La Paz',
      95,
    );

    expect(property).toBeInstanceOf(Property);
    expect(property.getName()).toBe('Casa en Miraflores');

    property.setName('Casa amoblada en Miraflores');
    expect(property.getName()).toBe('Casa amoblada en Miraflores');
  });

  test('Actualizar Precio Property', () => {
    const property: Property = new Property(
      4,
      'Garzonier en Sopocachi',
      'CAlle ABC',
      'Departamento',
      'La Paz',
      120,
    );

    expect(property).toBeInstanceOf(Property);
    expect(property.getPricePerNight().getValue()).toBe(120);

    property.setPricePerNight(new PositiveValue(130));
    expect(property.getPricePerNight().getValue()).toBe(130);
  });
});
