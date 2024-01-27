import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { GuestService } from '../../../../../src/booking/api/guest-event/guest.service';
import { CreateGuestCommand } from '../../../../../src/booking/application/commands/impl/create-guest.command';

class MockCommandBus {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  execute() {}
}

describe('GuestService', () => {
  let service: GuestService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuestService,
        { provide: CommandBus, useClass: MockCommandBus },
      ],
    }).compile();

    service = module.get<GuestService>(GuestService);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  it('llamar a pubSubHandler', async () => {
    const msg = {
      _id: '1',
      name: 'Sample Name',
      lastname: 'Sample Lastname',
      country: 'Sample Country',
      city: 'Sample City',
      email: 'Sample Email',
    };

    jest.spyOn(commandBus, 'execute').mockResolvedValueOnce(msg);

    await service.pubSubHandler(msg);

    expect(commandBus.execute).toHaveBeenCalledWith(
      new CreateGuestCommand({
        _id: msg._id,
        name: msg.name,
        lastname: msg.lastname,
        country: msg.country,
        city: msg.city,
        email: msg.email,
      }),
    );
  });
});
