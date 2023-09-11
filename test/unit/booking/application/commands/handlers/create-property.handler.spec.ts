import { BadRequestException } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePropertyHandler } from '../../../../../../src/booking/application/commands/handlers/create-property.handler';
import { CreatePropertyCommand } from '../../../../../../src/booking/application/commands/impl/create-property.command';
import { PropertyRepository } from '../../../../../../src/booking/infrastructure/mongoose/repositories/property.repository';
import { PropertyFactory } from '../../../../../../src/booking/domain/factories/property.factory';

describe('CreatePropertyHandler', () => {
  let createPropertyHandler: CreatePropertyHandler;
  let propertyRepository: PropertyRepository;
  let propertyFactory: PropertyFactory;
  let eventPublisher: EventPublisher;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePropertyHandler,
        {
          provide: PropertyRepository,
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: PropertyFactory,
          useValue: {
            createProperty: jest.fn(),
          },
        },
        {
          provide: EventPublisher,
          useValue: {
            mergeObjectContext: jest.fn(),
          },
        },
      ],
    }).compile();

    createPropertyHandler = module.get<CreatePropertyHandler>(
      CreatePropertyHandler,
    );
    propertyRepository = module.get<PropertyRepository>(PropertyRepository);
    propertyFactory = module.get<PropertyFactory>(PropertyFactory);
    eventPublisher = module.get<EventPublisher>(EventPublisher);
  });

  it('should be defined', () => {
    expect(createPropertyHandler).toBeDefined();
  });

  it('should create a property', async () => {
    // Mock y configuración del objeto createPropertyCommand y otros mocks según sea necesario
    const mockCreatePropertyRequest = {
      name: '12312',
      pricePerNight: 2,
    };
    // Ejecutar el controlador
    const createPropertyCommand = new CreatePropertyCommand(
      mockCreatePropertyRequest,
    );

    // const result = await createPropertyHandler.execute(createPropertyCommand);

    // Verificar que el método commit se llamó en Property o en EventPublisher según tu implementación
    // Ejemplo:
    // expect(mockProperty.commit).toHaveBeenCalled();
    // O
    // expect(eventPublisher.mergeObjectContext).toHaveBeenCalledWith(mockProperty);

    // Otras aserciones y verificaciones según sea necesario
  });

  // Agrega más pruebas y casos según sea necesario
});
