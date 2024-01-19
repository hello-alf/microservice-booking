import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PropertyRepository } from '../../../../../../src/booking/infrastructure/mongoose/repositories/property.repository';
import { PropertyModelSchema } from '../../../../../../src/booking/infrastructure/mongoose/schemas/property.schema';
import { PropertyMapper } from '../../../../../../src/booking/infrastructure/mongoose/mapper/property.mapper';

describe('PropertyRepository', () => {
  let propertyRepository: PropertyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyRepository,
        {
          provide: getModelToken(PropertyModelSchema.name),
          useValue: {},
        },
        PropertyMapper,
      ],
    }).compile();

    propertyRepository = module.get<PropertyRepository>(PropertyRepository);
  });

  it('should be defined', () => {
    expect(propertyRepository).toBeDefined();
  });

  // it('should find an item by ID', async () => {
  //   const result: Promise<BookingModelSchema[]> = Promise.resolve([]);
  //   jest.spyOn(bookingRepository, 'findAll').mockImplementation(() => result);

  //   expect(await bookingRepository.findAll()).toBe(result);
  // });
});
