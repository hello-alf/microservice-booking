import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { CreatePropertyCommand } from '../../../../../../src/booking/application/commands/impl/create-property.command';
import { CreatePropertyHandler } from '../../../../../../src/booking/application/commands/handlers/create-property.handler';
import { PropertyRepository } from '../../../../../../src/booking/infrastructure/mongoose/repositories/property.repository';
import { PropertyFactory } from '../../../../../../src/booking/domain/factories/property.factory';
import { CreatePropertyDto } from '../../../../../../src/booking/application/dtos/property.dto';

// Mock para EventPublisher
class MockEventPublisher {
  mergeObjectContext() {
    return {
      commit: jest.fn(),
    };
  }
}

// Mock para PropertyRepository
class MockPropertyRepository {
  save() {
    return {};
  }
}

// Mock para PropertyFactory
class MockPropertyFactory {
  createProperty() {
    return {};
  }
}

describe('CreatePropertyHandler', () => {
  let handler: ICommandHandler<CreatePropertyCommand>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePropertyHandler,
        {
          provide: PropertyRepository,
          useClass: MockPropertyRepository,
        },
        {
          provide: EventPublisher,
          useClass: MockEventPublisher,
        },
        {
          provide: PropertyFactory,
          useClass: MockPropertyFactory,
        },
      ],
    }).compile();

    handler = module.get<ICommandHandler<CreatePropertyCommand>>(
      CreatePropertyHandler,
    );
  });

  it('Debe estar definido', () => {
    expect(handler).toBeDefined();
  });

  it('Debe manejar el comando CreatePropertyCommand', async () => {
    const dto = new CreatePropertyDto();

    const command = new CreatePropertyCommand(dto);

    const result = await handler.execute(command);

    expect(result).toBeDefined();
  });
});
