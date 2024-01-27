import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { PropertyService } from '../../../../../src/booking/api/property-event/property.service';
import { CreatePropertyCommand } from '../../../../../src/booking/application/commands/impl/create-property.command';

class MockCommandBus {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  execute() {}
}

describe('PropertyService', () => {
  let service: PropertyService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyService,
        { provide: CommandBus, useClass: MockCommandBus },
      ],
    }).compile();

    service = module.get<PropertyService>(PropertyService);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  it('llamar a pubSubHandler', async () => {
    const msg = {
      id: '1',
      name: 'Sample Name',
      address: {
        street: 'Sample street',
        city: 'Sample City',
      },
      propertyType: 'Sample propertyType',
      pricePerNight: { value: 100 },
      host: '123',
    };

    jest.spyOn(commandBus, 'execute').mockResolvedValueOnce(msg);

    await service.pubSubHandler(msg);

    expect(commandBus.execute).toHaveBeenCalledWith(
      new CreatePropertyCommand({
        id: msg.id,
        name: msg.name,
        address: msg.address.street,
        propertyType: msg.propertyType,
        city: msg.address.city,
        pricePerNight: msg.pricePerNight.value,
        host: msg.host,
      }),
    );
  });
});
