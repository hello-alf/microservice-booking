import { Property } from '../../../../../src/booking/domain/model/property.model';
import { PositiveValue } from '../../../../../src/shared-kernel/valueObjects/positiveValue';

describe('Property', () => {
  it('Crear objeto tipo Property', () => {
    const property: Property = new Property('Departamento en Sopocachi', 95);

    expect(property).toBeInstanceOf(Property);
    expect(property.getName()).toBe('Departamento en Sopocachi');
    expect(property.getPricePerNight().getValue()).toBe(95);
  });

  it('Actualizar Nombre Property', () => {
    const property: Property = new Property('Casa en Miraflores', 155);

    expect(property).toBeInstanceOf(Property);
    expect(property.getName()).toBe('Casa en Miraflores');

    property.setName('Casa amoblada en Miraflores');
    expect(property.getName()).toBe('Casa amoblada en Miraflores');
  });

  it('Actualizar Precio Property', () => {
    const property: Property = new Property('Garzonier Alto Obrajes', 120);

    expect(property).toBeInstanceOf(Property);
    expect(property.getPricePerNight().getValue()).toBe(120);

    property.setPricePerNight(new PositiveValue(130));
    expect(property.getPricePerNight().getValue()).toBe(130);
  });
});
