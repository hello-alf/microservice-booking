import { BadRequestException } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePropertyHandler } from '../../../../../../src/booking/application/commands/handlers/create-property.handler';
import { CreatePropertyCommand } from '../../../../../../src/booking/application/commands/impl/create-property.command';
import { PropertyRepository } from '../../../../../../src/booking/infrastructure/mongoose/repositories/property.repository';
import { PropertyFactory } from '../../../../../../src/booking/domain/factories/property.factory';
import { CreatePropertyDto } from '../../../../../../src/booking/application/dtos/property.dto';

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
            commit: jest.fn(),
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

  it('Mostrar error BadRequestException', async () => {
    // Create a CancelBookingCommand instance
    const cancelBookingCommand = new CreatePropertyCommand(
      new CreatePropertyDto(),
    );

    await expect(
      createPropertyHandler.execute(cancelBookingCommand),
    ).rejects.toThrowError(BadRequestException);
  });
});
