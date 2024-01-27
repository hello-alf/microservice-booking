import { Test, TestingModule } from '@nestjs/testing';
import {
  NotFoundException,
  UnprocessableEntityException,
  BadRequestException,
} from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CreateBookingHandler } from '../../../../../../src/booking/application/commands/handlers/create-booking.handler';
import { CreateBookingCommand } from '../../../../../../src/booking/application/commands/impl/create-booking.command';
import { BookingRepository } from '../../../../../../src/booking/infrastructure/mongoose/repositories/booking.repository';
import { PropertyRepository } from '../../../../../../src/booking/infrastructure/mongoose/repositories/property.repository';
import { BookingFactory } from '../../../../../../src/booking/domain/factories/booking.factory';
import { CreateBookingDto } from '../../../../../../src/booking/application/dtos/booking.dto';
import { GuestRepository } from '../../../../../../src/booking/infrastructure/mongoose/repositories/guest.repository';

class MockEventPublisher {
  mergeObjectContext() {
    return {
      commit: jest.fn(),
    };
  }
}

class MockGuestRepository {
  findById() {
    return Promise.resolve({});
  }

  save() {
    return {};
  }
}

class MockBookingRepository {
  save() {
    return {};
  }

  findAvailableBooking() {
    return [];
  }

  findById(id: string) {
    return Promise.resolve(id === 'existingId' ? {} : null);
  }
}

class MockBookingFactory {
  createBooking() {
    return {
      commit: jest.fn(),
    };
  }
}

describe('CreateBookingHandler', () => {
  let handler: CreateBookingHandler;
  let bookingRepository: BookingRepository;
  let propertyRepository: PropertyRepository;
  let bookingFactory: BookingFactory;
  let publisher: EventPublisher;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateBookingHandler,
        {
          provide: BookingRepository,
          useClass: MockBookingRepository,
        },
        { provide: GuestRepository, useClass: MockGuestRepository },
        {
          provide: PropertyRepository,
          useValue: {
            findById: jest.fn().mockResolvedValue({
              propertyId: '64d1489fdb349b6cd3dafb92',
              numberOfGuests: 2,
              numberOfDays: 1,
              costByNight: 150,
              totalCost: 300,
              bookingState: 'Confirmado',
              paymentState: 'Pendiente',
              checkInDate: new Date(),
              checkOutDate: new Date(),
              registerDate: new Date(),
              updatedAt: new Date(),
            }),
          },
        },
        {
          provide: BookingFactory,
          useClass: MockBookingFactory,
        },
        {
          provide: EventPublisher,
          useClass: MockEventPublisher,
        },
      ],
    }).compile();

    handler = module.get<CreateBookingHandler>(CreateBookingHandler);
    bookingRepository = module.get<BookingRepository>(BookingRepository);
    propertyRepository = module.get<PropertyRepository>(PropertyRepository);
    bookingFactory = module.get<BookingFactory>(BookingFactory);
    publisher = module.get<EventPublisher>(EventPublisher);
  });

  it('Definir Create', () => {
    expect(handler).toBeDefined();
  });

  it('Crear reserva', async () => {
    propertyRepository.findById('12312');

    const mockCreateBookingRequest = {
      propertyId: '12312',
      numberOfGuests: 2,
      checkInDate: new Date(),
      checkOutDate: new Date(),
      guest: '123123',
    };

    // Create a CreateBookingCommand instance with appropriate data
    const createBookingCommand = new CreateBookingCommand(
      mockCreateBookingRequest,
    );

    const result = await handler.execute(createBookingCommand);

    // Assert
    expect(result).toBeDefined();
    expect(result.commit).toHaveBeenCalled();
  });
});
