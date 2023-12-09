import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PropertyController } from '../../../../../src/booking/api/property/property.controller';
import { CreatePropertyDto } from '../../../../../src/booking/application/dtos/property.dto';
import { CreatePropertyCommand } from '../../../../../src/booking/application/commands/impl/create-property.command';
import { GetPropertiesQuery } from '../../../../../src/booking/application/queries/impl/get-properties.query';

describe('BookingController', () => {
  let controller: PropertyController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PropertyController>(PropertyController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  test('Controller be defined', () => {
    expect(controller).toBeDefined();
  });

  test('Crear una propiedad', () => {
    const createPropertyDto: CreatePropertyDto = {
      id: 10,
      name: 'Casa Sopocachi',
      pricePerNight: 150,
      address: 'Calle 123',
      propertyType: 'Casa',
      city: 'Medellin',
    };
    controller.create(createPropertyDto);
    expect(commandBus.execute).toHaveBeenCalledWith(
      new CreatePropertyCommand(createPropertyDto),
    );
  });

  test('Listar todas las reservas', () => {
    controller.findAll();
    expect(queryBus.execute).toHaveBeenCalledWith(new GetPropertiesQuery());
  });
});
