import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher } from '@nestjs/cqrs';
// import { BadRequestException } from '@nestjs/common';
import { CreatePropertyHandler } from '../../../../../../src/booking/application/commands/handlers/create-property.handler';
import { PropertyRepository } from '../../../../../../src/booking/infrastructure/mongoose/repositories/property.repository';
import { CreatePropertyCommand } from '../../../../../../src/booking/application/commands/impl/create-property.command';
import { PropertyFactory } from '../../../../../../src/booking/domain/factories/property.factory';

jest.mock(
  '../../../../../../src/booking/infrastructure/mongoose/repositories/property.repository',
);
jest.mock('@nestjs/cqrs');

describe('CreatePropertyHandler', () => {
  let createPropertyHandler: CreatePropertyHandler;
  let propertyRepository: PropertyRepository;
  let eventPublisher: EventPublisher;
  let propertyFactory: PropertyFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePropertyHandler,
        PropertyRepository,
        EventPublisher,
        PropertyFactory,
      ],
    }).compile();

    createPropertyHandler = module.get<CreatePropertyHandler>(
      CreatePropertyHandler,
    );
    propertyRepository = module.get<PropertyRepository>(PropertyRepository);
    eventPublisher = module.get<EventPublisher>(EventPublisher);
    propertyFactory = module.get<PropertyFactory>(PropertyFactory);
  });

  test('Handler definido', () => {
    expect(createPropertyHandler).toBeDefined();
  });

  // test('Crear propiedad', async () => {
  //   const createPropertyRequest = {
  //     name: 'Test Property',
  //     pricePerNight: 100,
  //   };

  //   const mockCreatedProperty = {
  //     name: 'Casa Sopocachi',
  //     pricePerNight: 150,
  //   };

  //   // Mock propertyFactory.createProperty
  //   propertyFactory.createProperty = jest
  //     .fn()
  //     .mockReturnValue(mockCreatedProperty);

  //   // Mock propertyRepository.save
  //   propertyRepository.save = jest.fn().mockResolvedValue(mockCreatedProperty);

  //   // Mock publisher.mergeObjectContext
  //   eventPublisher.mergeObjectContext = jest
  //     .fn()
  //     .mockReturnValue(mockCreatedProperty);

  //   const createPropertyCommand = new CreatePropertyCommand(
  //     createPropertyRequest,
  //   );

  //   const result = await createPropertyHandler.execute(createPropertyCommand);

  //   expect(result).toBe(mockCreatedProperty);

  //   // Verify that the methods were called with the expected arguments
  //   expect(propertyFactory.createProperty).toHaveBeenCalledWith(
  //     createPropertyRequest.name,
  //     createPropertyRequest.pricePerNight,
  //   );

  //   expect(propertyRepository.save).toHaveBeenCalledWith(mockCreatedProperty);

  //   expect(eventPublisher.mergeObjectContext).toHaveBeenCalledWith(
  //     mockCreatedProperty,
  //   );
  // });

  // test('should throw a BadRequestException on error', async () => {
  //   const createPropertyRequest = {
  //     name: 'Test Property',
  //     pricePerNight: 100,
  //   };

  //   const errorMessage = 'Something went wrong';

  //   // Mock propertyFactory.createProperty to throw an error
  //   propertyFactory.createProperty = jest.fn().mockImplementation(() => {
  //     throw new Error(errorMessage);
  //   });

  //   const createPropertyCommand = new CreatePropertyCommand(
  //     createPropertyRequest,
  //   );

  //   try {
  //     await createPropertyHandler.execute(createPropertyCommand);
  //   } catch (error) {
  //     expect(error).toBeInstanceOf(BadRequestException);
  //     expect(error.message).toBe(errorMessage);
  //   }
  // });
});
