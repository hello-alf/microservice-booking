import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import config from '../../../../../src/booking/infrastructure/config';
import { MongooseConfigModule } from '../../../../../src/booking/infrastructure/mongoose/mongoose.module';

describe('Mongoose Module', () => {
  it.skip('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [config],
          isGlobal: true,
        }),
        MongooseConfigModule,
      ],
    }).compile();

    expect(module).toBeDefined();
  });
});
