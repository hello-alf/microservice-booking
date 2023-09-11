import { EventPublisher } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateBookingHandler } from '../../../../../../src/booking/application/commands/handlers/create-booking.handler';
import { CreateBookingCommand } from '../../../../../../src/booking/application/commands/impl/create-booking.command';
import { BookingRepository } from '../../../../../../src/booking/infrastructure/mongoose/repositories/booking.repository';
import { PropertyRepository } from '../../../../../../src/booking/infrastructure/mongoose/repositories/property.repository';
import { BookingFactory } from '../../../../../../src/booking/domain/factories/booking.factory';

describe('CreateBookingHandler', () => {
  let createBookingHandler: CreateBookingHandler;
  let bookingRepository: BookingRepository;
  let propertyRepository: PropertyRepository;
  let bookingFactory: BookingFactory;
  let eventPublisher: EventPublisher;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateBookingHandler,
        {
          provide: BookingRepository,
          useValue: {
            findById: jest.fn(),
            findAvailableBooking: jest.fn().mockResolvedValue([]),
            save: jest.fn().mockResolvedValue({
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
          useValue: {
            createBooking: jest.fn(),
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

    createBookingHandler =
      module.get<CreateBookingHandler>(CreateBookingHandler);
    bookingRepository = module.get<BookingRepository>(BookingRepository);
    propertyRepository = module.get<PropertyRepository>(PropertyRepository);
    bookingFactory = module.get<BookingFactory>(BookingFactory);
    eventPublisher = module.get<EventPublisher>(EventPublisher);
  });

  it('Definir Create', () => {
    expect(createBookingHandler).toBeDefined();
  });

  it('Crear reserva', async () => {
    const mockBooking = {
      commit: jest.fn(),
    };

    propertyRepository.findById('12312');

    const mockCreateBookingRequest = {
      propertyId: '12312',
      numberOfGuests: 2,
      checkInDate: new Date(),
      checkOutDate: new Date(),
    };

    // Create a CreateBookingCommand instance with appropriate data
    const createBookingCommand = new CreateBookingCommand(
      mockCreateBookingRequest,
    );
  });
});
