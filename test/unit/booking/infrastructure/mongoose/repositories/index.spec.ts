import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Repositories } from '../../../../../../src/booking/infrastructure/mongoose/repositories/index';
import { BookingRepository } from '../../../../../../src/booking/infrastructure/mongoose/repositories/booking.repository';
import { PropertyRepository } from '../../../../../../src/booking/infrastructure/mongoose/repositories/property.repository';
import { BookingModelSchema } from '../../../../../../src/booking/infrastructure/mongoose/schemas/booking.schema';
import { PropertyModelSchema } from '../../../../../../src/booking/infrastructure/mongoose/schemas/property.schema';
import { Mapper } from '../../../../../../src/booking/infrastructure/mongoose/mapper/index';

describe('BookingRepository', () => {
  let bookingRepository: BookingRepository;
  let propertyRepository: PropertyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ...Repositories,
        ...Mapper,
        {
          provide: getModelToken(BookingModelSchema.name),
          useValue: {},
        },
        {
          provide: getModelToken(PropertyModelSchema.name),
          useValue: {},
        },
      ],
    }).compile();

    bookingRepository = module.get<BookingRepository>(BookingRepository);
    propertyRepository = module.get<PropertyRepository>(PropertyRepository);
  });

  it('bookingRepository should be defined', () => {
    expect(bookingRepository).toBeDefined();
  });

  it('propertyRepository should be defined', () => {
    expect(propertyRepository).toBeDefined();
  });

  // it('should find an item by ID', async () => {
  //   const result: Promise<BookingModelSchema[]> = Promise.resolve([]);
  //   jest.spyOn(bookingRepository, 'findAll').mockImplementation(() => result);

  //   expect(await bookingRepository.findAll()).toBe(result);
  // });
});
