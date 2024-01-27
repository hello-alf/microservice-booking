import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { CreateGuestCommand } from '../../../../../../src/booking/application/commands/impl/create-guest.command';
import { CreateGuestHandler } from '../../../../../../src/booking/application/commands/handlers/create-guest.handler';
import { GuestRepository } from '../../../../../../src/booking/infrastructure/mongoose/repositories/guest.repository';
import { GuestFactory } from '../../../../../../src/booking/domain/factories/guest.factory';
import { CreateGuestDto } from '../../../../../../src/booking/application/dtos/guest.dto';

// Mock para EventPublisher
class MockEventPublisher {
  mergeObjectContext() {
    return {
      commit: jest.fn(),
    };
  }
}

// Mock para GuestRepository
class MockGuestRepository {
  save() {
    return {};
  }
}

// Mock para GuestFactory
class MockGuestFactory {
  createGuest() {
    return {};
  }
}

describe('CreateGuestHandler', () => {
  let handler: ICommandHandler<CreateGuestCommand>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateGuestHandler,
        {
          provide: GuestRepository,
          useClass: MockGuestRepository,
        },
        {
          provide: EventPublisher,
          useClass: MockEventPublisher,
        },
        {
          provide: GuestFactory,
          useClass: MockGuestFactory,
        },
      ],
    }).compile();

    handler =
      module.get<ICommandHandler<CreateGuestCommand>>(CreateGuestHandler);
  });

  it('Debe estar definido', () => {
    expect(handler).toBeDefined();
  });

  it('Debe manejar el comando CreateGuestCommand', async () => {
    const dto = new CreateGuestDto();

    const command = new CreateGuestCommand(dto);

    const result = await handler.execute(command);

    expect(result).toBeDefined();
  });
});
