import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BookingRepository } from '../../../../../../src/booking/infrastructure/mongoose/repositories/booking.repository';
import { BookingModelSchema } from '../../../../../../src/booking/infrastructure/mongoose/schemas/booking.schema';
import { BookingMapper } from '../../../../../../src/booking/infrastructure/mongoose/mapper/booking.mapper';

describe('BookingRepository', () => {
  let bookingRepository: BookingRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingRepository,
        {
          provide: getModelToken(BookingModelSchema.name),
          useValue: {},
        },
        BookingMapper,
      ],
    }).compile();

    bookingRepository = module.get<BookingRepository>(BookingRepository);
  });

  it('should be defined', () => {
    expect(bookingRepository).toBeDefined();
  });

  // it('should find an item by ID', async () => {
  //   const result: Promise<BookingModelSchema[]> = Promise.resolve([]);
  //   jest.spyOn(bookingRepository, 'findAll').mockImplementation(() => result);

  //   expect(await bookingRepository.findAll()).toBe(result);
  // });
});
