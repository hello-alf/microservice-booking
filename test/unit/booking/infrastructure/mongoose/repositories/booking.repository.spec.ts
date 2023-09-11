import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BookingRepository } from '../../../../../../src/booking/infrastructure/mongoose/repositories/booking.repository';
import { BookingModelSchema } from '../../../../../../src/booking/infrastructure/mongoose/schemas/booking.schema';
import { BookingModule } from '../../../../../../src/booking/booking.module';
import { MongooseConfigModule } from 'src/booking/infrastructure/mongoose/mongoose.module';
import { environments } from 'src/environments';
import config from 'src/booking/infrastructure/config';
import { Mapper } from 'src/booking/infrastructure/mongoose/mapper';
import { Repositories } from 'src/booking/infrastructure/mongoose/repositories';
import { SharedKernelModule } from 'src/shared-kernel/shared-kernel.module';

describe('BookingRepository', () => {
  let bookingRepository: BookingRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: environments[process.env.NODE_ENV] || '.env',
          load: [config],
          isGlobal: true,
        }),
        SharedKernelModule,
        BookingModule,
        MongooseConfigModule,
      ],
      providers: [
        {
          provide: getModelToken(BookingModelSchema.name),
          useValue: {}, // Puedes proporcionar un objeto mock de Mongoose aquí
        },
      ],
    }).compile();

    bookingRepository = module.get<BookingRepository>(BookingRepository);
  });

  it('should be defined', () => {
    expect(bookingRepository).toBeDefined();
  });

  // Agrega más pruebas aquí para cada método del repositorio
});
