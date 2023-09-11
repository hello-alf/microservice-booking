import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher } from '@nestjs/cqrs';
// import { BadRequestException } from '@nestjs/common';
import { CreatePropertyHandler } from '../../../../../../src/booking/application/commands/handlers/create-property.handler';
import { PropertyRepository } from '../../../../../../src/booking/infrastructure/mongoose/repositories/property.repository';
import { CreatePropertyCommand } from '../../../../../../src/booking/application/commands/impl/create-property.command';
import { PropertyFactory } from '../../../../../../src/booking/domain/factories/property.factory';
import { iPropertyRepository } from 'src/booking/domain/repositories/iProperty';

// Mocks para las dependencias
class MockPropertyRepository implements iPropertyRepository {
  findById: (id: string) => Promise<any>;
  findAll: () => Promise<any[]>;
  async save() {
    // Implementa la lógica de save simulada
  }
}

class MockPropertyFactory {
  createProperty() {
    // Implementa la lógica de createProperty simulada
  }
}

class MockEventPublisher {
  mergeObjectContext() {
    // Implementa la lógica de mergeObjectContext simulada
  }
}

describe('CreatePropertyHandler', () => {
  let createPropertyHandler: CreatePropertyHandler;
  let propertyRepository: MockPropertyRepository;
  let propertyFactory: MockPropertyFactory;
  let eventPublisher: MockEventPublisher;

  beforeEach(() => {
    propertyRepository = new MockPropertyRepository();
    propertyFactory = new MockPropertyFactory();
    eventPublisher = new MockEventPublisher();

    createPropertyHandler = new CreatePropertyHandler(
      propertyRepository,
      eventPublisher,
      propertyFactory,
    );
  });

  it('should create a property', async () => {
    // Define el comportamiento simulado de las dependencias en los mocks

    // Ejecuta el método execute del manejador con un comando simulado
    const command = new CreatePropertyCommand({
      name: 'Departmento prueba',
      pricePerNight: 400,
    });
    const result = await createPropertyHandler.execute(command);

    // Verifica el resultado esperado, por ejemplo, que result sea una instancia de Property
    expect(result).toBeInstanceOf(Property);
  });

  // Agrega pruebas adicionales según sea necesario para cubrir otros casos y condiciones.
});
